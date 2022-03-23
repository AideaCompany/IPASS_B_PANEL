import { updateMasterLocationFn } from '@/services/masterLocations'
import { ILocation, IMasterLocation } from '@/types/types'
import { CommonPropsModal } from '@/utils/utils'

import { PlusOutlined } from '@ant-design/icons'

import { Button, List, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactFlow, {
  Position,
  Elements,
  Edge,
  Connection,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  Handle
} from 'react-flow-renderer'
import ButtonEdge from './ButtonEdge'
import dagre from 'dagre'
import _ from 'lodash'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
const nodeWidth = 172
const nodeHeight = 36
const index = ({ locations, masterLocation }: { locations: ILocation[]; masterLocation: IMasterLocation }) => {
  //#endregion functions
  const elementsInitial = masterLocation.tree
    ? masterLocation.tree
    : [
        {
          id: masterLocation._id,
          data: { label: masterLocation.name },
          position: { x: 250, y: 25 },
          style: { border: '1px solid #ff8623' },
          type: 'custominput'
        }
      ]
  const getLayoutedElements = (elements: Edge<any>[], direction = 'TB') => {
    const isHorizontal = direction === 'LR'
    dagreGraph.setGraph({ rankdir: direction })

    elements.forEach(el => {
      if (isNode(el as any)) {
        dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight })
      } else {
        dagreGraph.setEdge(el.source, el.target)
      }
    })

    dagre.layout(dagreGraph)

    return elements.map(el => {
      if (isNode(el)) {
        const nodeWithPosition = dagreGraph.node(el.id)
        //@ts-ignore
        el.targetPosition = isHorizontal ? 'left' : 'top'
        //@ts-ignore
        el.sourcePosition = isHorizontal ? 'right' : 'bottom'

        // unfortunately we need this little hack to pass a slightly different position
        // to notify react flow about the change. Moreover we are shifting the dagre node position
        // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2
        }
      }

      return el
    })
  }
  //#region states
  const [visible, setVisible] = useState(false)
  const [elements, setElements] = useState<Elements>(getLayoutedElements(elementsInitial))
  const [instance, setInstance] = useState(null)
  //#endregion states

  //#region effect
  useEffect(() => {
    if (elements !== elementsInitial) {
      update()
    }
  }, [elements])
  //#endregion effect

  //#region  functions
  const handleClose = () => {
    setVisible(false)
  }

  const update = async () => {
    //@ts-ignore
    updateMasterLocationFn({ _id: masterLocation._id, tree: instance?.getElements() })
  }

  const addLocation = (location: ILocation) => {
    setElements(actual => [...actual, { id: location._id, data: { label: location.name }, position: { x: 100, y: 100 }, type: 'customnode' }])
    handleClose()
  }

  //@ts-ignore
  const onElementsRemove = (elementsToRemove: Elements<any>) => {
    if (elementsToRemove[0] && elementsToRemove[0]?.id !== masterLocation._id) {
      setElements(els => removeElements(elementsToRemove, els))
    }
  }

  const onConnect = (params: Edge<any> | Connection) =>
    setElements(els => addEdge({ ...params, id: `edge${params.source}-${params.target}`, type: 'buttonedge', style: { strokeWidth: '2px' } }, els))

  const edgeTypes = {
    buttonedge: (e: any) => ButtonEdge(e, onPress)
  }
  const onLoad = (reactFlowInstance: any) => {
    reactFlowInstance.fitView()
    setInstance(reactFlowInstance)
  }

  //@ts-ignore
  const actualUsed = _.uniq([...elements.filter(e => e.source).map(e => e.source), ...elements.filter(e => e.target).map(e => e.target)]).filter(
    e => e !== masterLocation._id
  )

  const deleteNodeSelected = (value: any) => {
    Modal.confirm({
      title: `¿Seguro deseas eliminar la locacion ${value.data.label}?`,
      onOk: () => {
        //@ts-ignore
        onElementsRemove([value])
      }
    })
  }

  const onPress = (id: string) => {
    Modal.confirm({
      title: '¿Seguro deseas eliminar la relación?',
      onOk: () => {
        //@ts-ignore
        onElementsRemove([elements.find(e => e.id === id) as any])
      }
    })
  }
  const CustomInput = (value: any) => {
    return (
      <>
        <div>{value.data.label}</div>
        <Handle type="source" position={Position.Bottom} isValidConnection={() => true} />
      </>
    )
  }

  const CustomNode = (value: any) => (
    <>
      {value.selected && (
        <div className="deleButton">
          <button className="edgebutton" onClick={event => deleteNodeSelected(value)}>
            ×
          </button>
        </div>
      )}
      <Handle type="target" position={Position.Top} isValidConnection={() => true} />
      <div>{value.data.label}</div>
      <Handle type="source" position={Position.Bottom} isValidConnection={() => true} />
    </>
  )

  const nodeTypes = {
    custominput: CustomInput,
    customnode: CustomNode
  }

  //#endregion functions
  return (
    <>
      <div className="containerTree">
        <Button style={{ marginBottom: 10 }} onClick={() => setVisible(true)} shape="round" type="primary">
          Agregar Locación
        </Button>
        <div className={'diagramContainer'}>
          <ReactFlow
            onNodeDragStop={update}
            onLoad={onLoad}
            snapToGrid={true}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            className="validationflow"
            onElementsRemove={onElementsRemove}
            elements={elements}
            nodeTypes={nodeTypes}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
      <Modal onCancel={handleClose} {...CommonPropsModal} width={600} visible={visible}>
        <div style={{ padding: 10 }}>
          <List
            dataSource={locations.filter(l => !actualUsed.includes(l._id))}
            bordered
            renderItem={item => (
              <List.Item actions={[<Button onClick={() => addLocation(item)} shape="circle" icon={<PlusOutlined />} />]}>
                <span>{item.name}</span>
              </List.Item>
            )}
          ></List>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(index)
