import { getAllContactUser } from '@/services/contact'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { Form, Table, Transfer } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import difference from 'lodash/difference'
import React, { useEffect, useState } from 'react'
const guestsEventForm = () => {
  const [guestUsers, setGuestUsers] = useState<IContact[]>()
  const [targetKeys, setTargetKeys] = useState<string[]>([])
  // useEffect(() => {
  //   if (targetKeys.length === 0) {
  //     setDisabled(true)
  //   }
  // }, [targetKeys])

  const onChange = (currentTargetKeys: string[]) => {
    setTargetKeys(currentTargetKeys)
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const newGuestUsers = await getAllContactUser()
    setGuestUsers(newGuestUsers)
  }

  const columns = [
    {
      dataIndex: 'firstName',
      title: 'Nombre'
    },
    {
      dataIndex: 'lastName',
      title: 'Apellido'
    },
    {
      dataIndex: 'email',
      title: 'Correo'
    }
  ]

  return (
    <Form.Item
      name={'guests'}
      // rules={[
      //   {
      //     validator: (_, value) => {
      //       if (value.length > 0) {
      //         return Promise.resolve()
      //       } else {
      //         return Promise.reject()
      //       }
      //     }
      //   }
      // ]}
    >
      <Transfer
        dataSource={guestUsers}
        onChange={onChange}
        targetKeys={targetKeys}
        disabled={false}
        showSearch={true}
        filterOption={(inputValue, item) =>
          item.firstName?.toLocaleLowerCase()?.indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
          item.lastName?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1 ||
          item.email?.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) !== -1
        }
        titles={['Contactos', 'Seleccionados']}
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

export default React.memo(guestsEventForm)
