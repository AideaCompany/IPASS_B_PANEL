import React, { useContext, useRef } from 'react'
import { DocumentNode } from 'graphql'
import { Translations } from '../../i18n/types'
import client from '../../graphql/config'
import { message, Modal, Tooltip, Form } from 'antd'
import { PermissionsPrivilege } from '@/types/types'
import { ThemeContext } from '../../providers/ThemeContext'
import { EditFilled } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import { FormFactory } from '@/types/typeTemplate'
import moment from 'moment-timezone'
const UpdateItem = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  mutation: DocumentNode
  record: any
  beforeShowUpdate?: (param: any) => any
  beforeUpdate?: (param: any) => any
  FormItems: JSX.Element
  afterUpdate?: () => void
  formElements: FormFactory.FormFactoryType[]
  manageMentError?: (err: any) => void
  paramTitle?: string
}): JSX.Element => {
  const {
    paramTitle,
    translations,
    actualPermission,
    mutation,
    formElements,
    FormItems,
    afterUpdate,
    beforeShowUpdate,
    beforeUpdate,
    record,
    manageMentError
  } = props

  const { theme } = useContext(ThemeContext)
  const formRef = useRef<FormInstance>(null)
  const updateItem = async (_id: string) => {
    message.loading({ content: translations.updating, key: 'update', duration: 0 })
    let formData = await formRef.current?.validateFields()
    for (let k = 0; k < formElements.length; k++) {
      if (formData[formElements[k].name] !== null && formData[formElements[k].name] !== undefined) {
        switch (formElements[k].type) {
          case 'date':
            formData[formElements[k].name] = new Date(formData[formElements[k].name]).getTime().toString()
            break
          case 'hour':
            formData[formElements[k].name] = moment.tz(formData[formElements[k].name], 'America/Guatemala').format('HH:mm')
            break
          case 'phone':
            console.log(formData.indicativo)
            break
        }
      }
    }
    if (beforeUpdate) {
      formData = beforeUpdate(formData)
    }

    console.log(formData)
    client
      .mutate({ mutation: mutation, variables: { input: { ...formData, _id } } })
      .then(res => {
        afterUpdate && afterUpdate()
        message.success({ content: translations.successfullyUpdated, key: 'update' })
      })
      .catch(err => {
        if (manageMentError) {
          manageMentError(err['message'])
        } else {
          message.error({ content: translations.errorUpdated, key: 'update' })
        }
      })
  }

  const updateModal = (item: any) => {
    let toShow = JSON.parse(JSON.stringify(item))
    for (let k = 0; k < formElements.length; k++) {
      if (item[formElements[k].name] !== null && item[formElements[k].name] !== undefined) {
        switch (formElements[k].type) {
          case 'select':
            if (Object.keys(item[formElements[k].name]).findIndex(e => e === '_id') !== -1) {
              toShow[formElements[k].name] = item[formElements[k].name]?._id
            }
            break
          case 'selectMultiple':
            if (item[formElements[k].name].length > 0) {
              for (let l = 0; l < item[formElements[k].name].length; l++) {
                if (item[formElements[k].name][l] !== null) {
                  if (Object.keys(item[formElements[k].name][l]).findIndex(e => e === '_id') !== -1) {
                    toShow[formElements[k].name][l] = item[formElements[k].name][l]?._id
                  }
                }
              }
            }
            break
          case 'date':
            toShow[formElements[k].name] = moment.tz(item[formElements[k].name], 'America/Guatemala')
            break
          case 'hour':
            toShow[formElements[k].name] = moment.tz(item[formElements[k].name], 'America/Guatemala')
            break
          default:
            break
        }
      }
    }
    if (beforeShowUpdate) {
      toShow = beforeShowUpdate(toShow)
    }
    Modal.warning({
      title: paramTitle ? translations[paramTitle] : translations.titleModalUpdate,
      content: (
        <Form ref={formRef} initialValues={toShow}>
          {FormItems}
        </Form>
      ),
      onOk: () => updateItem(item._id),
      okText: translations.ok,
      cancelText: translations.cancel,
      okCancel: true,
      centered: true,
      className: `modalCrud${theme}`
    })
  }
  return (
    <>
      {actualPermission?.update && (
        <Tooltip placement="top" title={paramTitle ? translations[paramTitle] : translations.edit}>
          <a>
            <EditFilled style={{ paddingLeft: '5px', fontSize: '18px', color: 'Dodgerblue' }} onClick={() => updateModal(record)} />
          </a>
        </Tooltip>
      )}
    </>
  )
}

export default React.memo(UpdateItem)
