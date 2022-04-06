/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { DocumentNode } from 'graphql'
import { ITranslations } from '../../i18n/types'
import client from '../../graphql/config'
import { message, Modal, Tooltip } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

const DeleteItem = (props: {
  actualPermission: IPermissionsPrivilege
  translations: ITranslations
  mutation: DocumentNode
  theme: string
  record: any
  afterDelete?: () => void
}): JSX.Element => {
  const { actualPermission, translations, mutation, record, theme, afterDelete } = props

  const deleteItem = (data: any) => {
    client
      .mutate({ mutation: mutation, variables: { input: { _id: data._id } } })
      .then(() => {
        message.success(translations.successfullyDeleted)
        if (afterDelete) {
          afterDelete()
        }
      })
      .catch(err => {
        console.info(err)
        message.error(translations.errorDeleted)
      })
  }

  const deleteModal = (item: any) => {
    Modal.confirm({
      title: `${translations.titleModalDelete} ${item.name as string}?`,
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
