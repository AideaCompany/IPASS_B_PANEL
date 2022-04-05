/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useRef } from 'react'
import { DocumentNode } from 'graphql'
import { ITranslations } from '../../i18n/types'
import client from '../../graphql/config'
import { message, Modal, Tooltip, Form } from 'antd'

import { ThemeContext } from '../../providers/ThemeContext'
import { EditFilled } from '@ant-design/icons'
import { FormInstance } from 'antd/lib/form'
import { FormFactory } from '@/types/typeTemplate'
import moment from 'moment-timezone'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
const UpdateItem = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  mutation: DocumentNode
  record: unknown
  beforeShowUpdate?: (param: any) => any
  beforeUpdate?: (param: any) => any
  FormItems: JSX.Element
  afterUpdate?: () => void
  formElements: FormFactory.IFormFactoryType<any>[]
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
    for (const currentFormElement of formElements) {
      if (formData[currentFormElement.name] !== null && formData[currentFormElement.name] !== undefined) {
        switch (currentFormElement.type) {
          case 'date':
            formData[currentFormElement.name] = new Date(formData[currentFormElement.name] as string).getTime().toString()
            break
          case 'hour':
            formData[currentFormElement.name] = moment.tz(formData[currentFormElement.name], 'America/Guatemala').format('HH:mm')
            break
          case 'phone':
            console.info(formData.indicativo)
            break
        }
      }
    }
    if (beforeUpdate) {
      formData = beforeUpdate(formData)
    }
    client
      .mutate({ mutation: mutation, variables: { input: { ...formData, _id } } })
      .then(() => {
        if (afterUpdate) {
          afterUpdate()
        }
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
    for (const currentFormElement of formElements) {
      if (item[currentFormElement.name] !== null && item[currentFormElement.name] !== undefined) {
        switch (currentFormElement.type) {
          case 'select':
            if (Object.keys(item[currentFormElement.name] as object).findIndex(e => e === '_id') !== -1) {
              toShow[currentFormElement.name] = item[currentFormElement.name]?._id
            }
            break
          case 'selectMultiple':
            if (item[currentFormElement.name].length > 0) {
              for (let l = 0; l < item[currentFormElement.name].length; l++) {
                if (item[currentFormElement.name][l] !== null) {
                  if (Object.keys(item[currentFormElement.name][l] as object).findIndex(e => e === '_id') !== -1) {
                    toShow[currentFormElement.name][l] = item[currentFormElement.name][l]?._id
                  }
                }
              }
            }
            break
          case 'date':
            toShow[currentFormElement.name] = moment.tz(item[currentFormElement.name], 'America/Guatemala')
            break
          case 'hour':
            toShow[currentFormElement.name] = moment.tz(item[currentFormElement.name], 'America/Guatemala')
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
      onOk: () => updateItem(item._id as string),
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
