import React, { FC } from 'react'
import { getEdgeCenter, getMarkerEnd, getSmoothStepPath } from 'react-flow-renderer'

const foreignObjectSize = 40

//@ts-ignore
const CustomEdge: FC<any> = (
  { id, sourceX, sourceY, selected, targetX, targetY, sourcePosition, targetPosition, style = {}, data, arrowHeadType, markerEndId },
  onPress
) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId)
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  })
  const onEdgeClick = (evt: any, id: any) => {
    evt.stopPropagation()
    onPress(id)
  }
  return (
    <>
      <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
        type="smoothstep"
      >
        {selected && (
          <body>
            <button className="edgebutton" onClick={event => onEdgeClick(event, id)}>
              ×
            </button>
          </body>
        )}
      </foreignObject>
    </>
  )
}

export default CustomEdge
