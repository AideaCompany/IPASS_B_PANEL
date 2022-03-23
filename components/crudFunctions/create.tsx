import React, { useRef, useContext } from 'react'
import { message, Modal, Form, Tooltip, Button } from 'antd'
import { FormInstance } from 'antd/lib/form'
import { DocumentNode } from 'graphql'
import client from '../../graphql/config'
import { Translations } from '../../i18n/types'
import { PermissionsPrivilege } from '../../types/types'
import ButtonsCrud from '../ButtonsCrud'
import { ThemeContext } from '../../providers/ThemeContext'
import { FormFactory } from '@/types/typeTemplate'
import { PlusOutlined } from '@ant-design/icons'
const CreateItem = (props: {
  actualPermission: PermissionsPrivilege
  translations: Translations
  mutation: DocumentNode
  beforeCreate?: (data: any) => any
  FormItem: JSX.Element
  initialValues?: any
  formElements: FormFactory.FormFactoryType[]
  afterCreate?: any
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
    var formData = (await formRef.current?.validateFields()) as any
    for (let k = 0; k < formElements.length; k++) {
      if (formData[formElements[k].name] !== null && formData[formElements[k].name] !== undefined) {
        switch (formElements[k].type) {
          case 'boolean':
            formData[formElements[k].name] = formData[formElements[k].name] ? true : false
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
      .then(res => {
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
