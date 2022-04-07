import useLocationView from '@/providers/ViewLocationContext'
import React, { useState } from 'react'
import { Form, Transfer, Table } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { difference } from 'lodash'
const AdminLocation = () => {
  const { admins, actualLocation } = useLocationView()
  const [targetKeys, setTargetKeys] = useState<string[]>(actualLocation?.admins ? (actualLocation.admins as string[]) : [])
  const onChange = (currentTargetKeys: string[]) => {
    setTargetKeys(currentTargetKeys)
  }

  const columns = [
    {
      dataIndex: 'name',
      title: 'Nombre'
    },
    {
      dataIndex: 'lastname',
      title: 'Apellido'
    },
    {
      dataIndex: 'email',
      title: 'Correo'
    }
  ]

  return (
    <Form.Item name={'admins'}>
      <Transfer
        dataSource={admins}
        onChange={onChange}
        targetKeys={targetKeys}
        disabled={false}
        showSearch={true}
        filterOption={(inputValue, item) =>
          item.name?.toLocaleLowerCase()?.indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
          item.lastName?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
          item.email?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1
        }
        titles={['Administradores', 'Seleccionados']}
        style={{ marginBottom: 16 }}
      >
        {({ filteredItems, onItemSelectAll, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled }) => {
          const rowSelection: TableRowSelection<{
            key: string
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : undefined }}
              onRow={({ key }) => ({
                onClick: () => {
                  if (listDisabled) {
                    return
                  }
                  onItemSelect(key, !listSelectedKeys.includes(key))
                }
              })}
            />
          )
        }}
      </Transfer>
    </Form.Item>
  )
}

export default React.memo(AdminLocation)
