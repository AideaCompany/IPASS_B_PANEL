import { LockOutlined } from '@ant-design/icons'
import { message, Modal, Tooltip } from 'antd'
import { DocumentNode } from 'graphql'
import React from 'react'
import client from '../../graphql/config'
import { Translations } from '../../i18n/types'

const UnBan = (props: {
  translations: Translations
  mutation: DocumentNode
  theme: string
  record: any
  content?: any
  afterDelete?: () => void
}): JSX.Element => {
  const { translations, mutation, record, theme, afterDelete, content } = props
  const unBanUser = (data: any) => {
    client
      .mutate({ mutation: mutation, variables: { input: { _id: data._id } } })
      .then(res => {
        message.success(translations.successfullyUpdated)
        afterDelete && afterDelete()
      })
      .catch(err => {
        console.error(err)
        message.error(translations.errorUpdated)
      })
  }

  const unBanModal = async (item: any) => {
    var result
    if (content) {
      result = await content(item)
    }
    Modal.confirm({
      title: `${translations.titleModalUnBan} ${item.email}?`,
      okText: translations.buttonUnBan,
      content: result,
      onOk: () => unBanUser(item),
      cancelText: translations.cancel,
      className: `modalCrud${theme}`,
      centered: true,
      maskClosable: true,
      okCancel: true
    })
  }

  return (
    <>
      <Tooltip placement="top" title={translations.unBan}>
        <a>
          <LockOutlined style={{ paddingLeft: '5px' }} onClick={() => unBanModal(record)} />
        </a>
      </Tooltip>
    </>
  )
}

export default React.memo(UnBan)
