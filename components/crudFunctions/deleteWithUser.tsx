/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { DocumentNode } from 'graphql'
import { ITranslations } from '../../i18n/types'
import client from '../../graphql/config'
import { message, Modal, Tooltip } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import useAuth from '@/providers/AuthContext'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

const DeleteWithUser = (props: {
  actualPermisions: IPermissionsPrivilege
  translations: ITranslations
  mutation: DocumentNode
  theme: string
  record: any
  content?: (value: any) => any
  afterDelete?: () => void
}): JSX.Element => {
  const { actualPermisions, translations, mutation, record, theme, afterDelete, content } = props
  const { user } = useAuth()
  const deleteItem = (data: any) => {
    client
      .mutate({ mutation: mutation, variables: { input: { _id: data._id, whoDeleted: data.whoDeleted } } })
      .then(() => {
        message.success({ content: translations.successfullyDeleted, key: 'delete' })
        if (afterDelete) {
          afterDelete()
        }
      })
      .catch(err => {
        console.info(err)
        message.error(translations.errorDeleted)
      })
  }

  const deleteModal = async (item: any) => {
    item.whoDeleted = user._id
    let result
    if (content) {
      result = await content(item)
    }
    Modal.confirm({
      title: `${translations.titleModalDelete} ${item.name as string}?`,
      okText: translations.buttonDelete,
      content: result,
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
      {actualPermisions?.delete && (
        <Tooltip placement="top" title={translations.delete}>
          <a>
            <DeleteOutlined style={{ paddingLeft: '5px' }} onClick={() => deleteModal(record)} />
          </a>
        </Tooltip>
      )}
    </>
  )
}

export default React.memo(DeleteWithUser)
