import React from 'react'
import { DocumentNode } from 'graphql'
import { Translations } from '../../i18n/types'
import client from '../../graphql/config'
import { message, Modal, Tooltip } from 'antd'
import { PermissionsPrivilege } from '../../types/types'
import { DeleteOutlined } from '@ant-design/icons'

const DeleteItem = (props: {
  actualPermission: PermissionsPrivilege
  translations: Translations
  mutation: DocumentNode
  theme: string
  record: any
  afterDelete?: () => void
}): JSX.Element => {
  const { actualPermission, translations, mutation, record, theme, afterDelete } = props

  const deleteItem = (data: any) => {
    client
      .mutate({ mutation: mutation, variables: { input: { _id: data._id } } })
      .then(res => {
        message.success(translations.successfullyDeleted)
        afterDelete && afterDelete()
      })
      .catch(err => {
        console.error(err)
        message.error(translations.errorDeleted)
      })
  }

  const deleteModal = (item: any) => {
    Modal.confirm({
      title: `${translations.titleModalDelete} ${item.name}?`,
      okText: translations.buttonDelete,
      onOk: () => deleteItem(item),
      cancelText: translations.cancel,
      className: `modalCrud${theme}`,
      centered: true,
      maskClosable: true,
      okCancel: true
    })
  }

  return (
    <>
      {actualPermission?.delete && (
        <Tooltip placement="top" title={translations.delete}>
          <a>
            <DeleteOutlined style={{ paddingLeft: '5px', fontSize: '18px', color: 'tomato' }} onClick={() => deleteModal(record)} />
          </a>
        </Tooltip>
      )}
    </>
  )
}

export default React.memo(DeleteItem)
