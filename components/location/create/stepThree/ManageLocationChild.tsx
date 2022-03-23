import { Translations } from '@/i18n/types'
import useLocation from '@/providers/LocationContext'
import { ILocation } from '@/types/types'
import { Form, Table, Transfer } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import difference from 'lodash/difference'
import React, { useState } from 'react'
const ManageLocationChild = ({
  translate,
  locations,
  setSelectedLocations
}: {
  translate: Translations
  locations: ILocation[]
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const { data } = useLocation()

  const [targetKeys, setTargetKeys] = useState<string[]>(data?.childLocations ? (data.childLocations as string[]) : [])

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
    },
    {
      dataIndex: 'serialNumber',
      title: 'Número serial'
    }
  ]
  return (
    <>
      <h2>{translate.childLocations}</h2>
      <Form.Item name={'childLocations'}>
        <Transfer
          dataSource={locations}
          onChange={onChange}
          targetKeys={targetKeys}
          disabled={false}
          showSearch={true}
          filterOption={
            (inputValue, item) =>
              item.name?.toLocaleLowerCase()?.indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
              item.address?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1
            /* item.serialNumber?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 */
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

export default React.memo(ManageLocationChild)
