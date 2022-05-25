/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useContext } from 'react'
import { message, Modal, Form, Tooltip, Button } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { DocumentNode } from 'graphql'
import client from '../../graphql/config'
import { ITranslations } from '../../i18n/types'

import ButtonsCrud from '../ButtonsCrud'
import { ThemeContext } from '../../providers/ThemeContext'
import { FormFactory } from '@/types/typeTemplate'
import { PlusOutlined } from '@ant-design/icons'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
const CreateItem = (props: {
  actualPermission: IPermissionsPrivilege
  translations: ITranslations
  mutation: DocumentNode
  beforeCreate?: (data: any) => any
  FormItem: JSX.Element
  initialValues?: any
  formElements: FormFactory.IFormFactoryType<any>[]
  afterCreate?: () => void
  manageMentError?: (err: any) => void
  customButton?: JSX.Element
  iconButton?: boolean
  paramTitle?: string
}): JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const {
    actualPermission,
    translations,
    mutation,
    afterCreate,
    manageMentError,
    FormItem,
    beforeCreate,
    initialValues,
    formElements,
    customButton,
    iconButton,
    paramTitle
  } = props
  const formRef = useRef<FormInstance>(null)
  const createItem = async () => {
    let formData = await formRef.current?.validateFields()
    for (const currentFormElement of formElements) {
      if (formData[currentFormElement.name] !== null && formData[currentFormElement.name] !== undefined) {
        switch (currentFormElement.type) {
          case 'boolean':
            formData[currentFormElement.name] = formData[currentFormElement.name] ? true : false
            break
        }
      }
    }
    if (beforeCreate) {
      formData = beforeCreate(formData)
    }
    message.loading({ content: translations.creating, key: 'creating', duration: 0 })
    client
      .mutate({ mutation: mutation, variables: { input: { ...formData } } })
      .then(() => {
        message.success({ content: translations.successfullyCreated, key: 'creating' })
        if (afterCreate) {
          afterCreate()
        }
      })
      .catch(err => {
        if (manageMentError) {
          manageMentError(err['message'])
        } else {
          message.error({ content: translations.errorCreated, key: 'creating' })
        }
      })
  }

  const createModal = () => {
    Modal.warn({
      title: `${paramTitle ? translations[paramTitle] : translations.titleModalCreate} `,
      content: (
        <Form ref={formRef} initialValues={initialValues && initialValues}>
          {FormItem}
        </Form>
      ),
      onOk: createItem,
      okText: translations.ok,
      cancelText: translations.cancel,
      okCancel: true,
      centered: true,
      className: `modalCrud${theme}`
    })
  }

  return (
    <>
      {actualPermission?.create && customButton ? (
        customButton
      ) : iconButton ? (
        <Tooltip title={paramTitle ? translations[paramTitle] : translations.titleModalCreate}>
          <Button style={{ margin: '5px' }} onClick={createModal} shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      ) : (
        <ButtonsCrud titleCreate={translations.titleModalCreate} functionCreate={createModal} />
      )}
    </>
  )
}

export default React.memo(CreateItem)
