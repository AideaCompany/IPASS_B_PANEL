import useLocationView from '@/providers/ViewLocationContext'
import { ILocation } from '@/types/types'
import { Form, Table, Transfer } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { difference } from 'lodash'
import React, { useState } from 'react'
const ManageLocationParent = ({
  locations,
  setSelectedLocations
}: {
  locations: ILocation[]
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const { translate, actualLocation } = useLocationView()
  const [targetKeys, setTargetKeys] = useState<string[]>(actualLocation?.parentLocations ? (actualLocation.parentLocations as string[]) : [])

  const onChange = (targetKeys: string[]) => {
    setSelectedLocations(targetKeys)
    setTargetKeys(targetKeys)
  }
  const columns = [
    {
      dataIndex: 'name',
      title: 'Nombre'
    },
    {
      dataIndex: 'address',
      title: 'Dirección'
    }
  ]
  return (
    <>
      <h2>{translate.parentLocations}</h2>
      <Form.Item name={'parentLocations'}>
        <Transfer
          dataSource={locations}
          onChange={onChange}
          targetKeys={targetKeys}
          disabled={false}
          showSearch={true}
          filterOption={(inputValue, item) =>
            item.name?.toLocaleLowerCase()?.indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
            item.address?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1
          }
          titles={['Locaciones', 'Seleccionadas']}
          style={{ marginBottom: 16 }}
        >
          {({ filteredItems, onItemSelectAll, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled }) => {
            const rowSelection: TableRowSelection<{
              key: any
            }> = {
              getCheckboxProps: () => ({ disabled: listDisabled }),
              onSelectAll(selected, selectedRows) {
                const treeSelectedKeys = selectedRows.map(({ key }) => key)
                const diffKeys = selected ? difference(treeSelectedKeys, listSelectedKeys) : difference(listSelectedKeys, treeSelectedKeys)
                onItemSelectAll(diffKeys, selected)
              },
              onSelect({ key }, selected) {
                onItemSelect(key, selected)
              },
              selectedRowKeys: listSelectedKeys
            }

            return (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                //@ts-ignore
                dataSource={filteredItems}
                size="small"
                style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                onRow={({ key }) => ({
                  onClick: () => {
                    if (listDisabled) return
                    onItemSelect(key, !listSelectedKeys.includes(key))
                  }
                })}
              />
            )
          }}
        </Transfer>
      </Form.Item>
    </>
  )
}

export default React.memo(ManageLocationParent)
