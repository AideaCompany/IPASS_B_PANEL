import React, { useRef, useState, useEffect } from 'react'

import { Translations } from 'i18n/types'
import ButtonsCrud from '@/components/ButtonsCrud'
import { FormInstance } from 'antd/lib/form'
import { message, Modal, Form, Tooltip } from 'antd'
import TableData from '../TableDatas'
import ColumnFactory from './columnFactory'
import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { ColumnFactoryType } from '@/types/typeTemplate'

const TableComponent = (props: {
  FormItems: (update: boolean, key?: string) => JSX.Element
  translations: Translations
  theme: string
  actualRef: FormInstance<any> | null | undefined
  name: string
  columns: ColumnFactoryType[]
  inicialData?: any
}) => {
  const { translations, theme, actualRef, columns, FormItems, name, inicialData } = props
  const formRef = useRef<FormInstance>(null)
  const [data, setdata] = useState<any>([])
  useEffect(() => {
    if (inicialData) {
      inicialData.map((e: any, i: any) => (e.key = i))
      actualRef?.setFieldsValue({ [name]: inicialData })
      setdata(inicialData)
    } else if (actualRef) {
      const actualData = actualRef?.getFieldValue(name)
      if (actualData) {
        actualData.map((e: any, i: any) => (e.key = i))
        setdata(actualData)
      }
    }
  }, [actualRef, inicialData])

  const createItem = async () => {
    var formData = await formRef.current?.validateFields()
    var actualData = actualRef?.getFieldValue(name)
    if (actualData) {
      actualData.push({ ...formData })
    } else {
      actualData = [{ ...formData }]
    }
    actualData.map((e: any, i: any) => (e.key = i))
    setdata([...actualData])
    actualRef?.setFieldsValue({ [name]: actualData })
    message.success('agregado')
  }

  const createModal = () => {
    Modal.warn({
      title: `${translations.addNew} `,
      content: (
        <div className="createModal">
          <Form ref={formRef}>{FormItems(false)}</Form>
        </div>
      ),
      onOk: createItem,
      okText: translations.ok,
      cancelText: translations.cancel,
      okCancel: true,
      centered: true,
      className: `modalCrud${theme}`
    })
  }
  const updateItem = async (key: string) => {
    var formData: any = await formRef.current?.validateFields()
    var actualData: any = actualRef?.getFieldValue(name)
    const pos = actualData.findIndex((e: any) => e.key === key)
    if (pos !== -1) {
      actualData[pos] = { ...formData, key }
    }
    setdata([...actualData])
    actualRef?.setFieldsValue({ [name]: actualData })
  }
  const updateModal = (item: any) => {
    Modal.warning({
      title: translations.update,
      content: (
        <Form ref={formRef} initialValues={item}>
          {FormItems(true, item.key)}
        </Form>
      ),
      onOk: () => updateItem(item.key),
      okText: translations.ok,
      cancelText: translations.cancel,
      okCancel: true,
      centered: true,
      className: `modalCrud${theme}`
    })
  }
  const deleteItem = async (key: string) => {
    var actualData: any = actualRef?.getFieldValue(name)
    const pos = actualData.findIndex((e: any) => e.key === key)
    if (pos !== -1) {
      actualData.splice(pos, 1)
    }
    actualData.map((e: any, i: any) => (e.key = i))
    setdata([...actualData])
    actualRef?.setFieldsValue({ [name]: actualData })
  }
  const deleteModal = (item: any) => {
    Modal.confirm({
      title: `${translations.remove} ?`,
      okText: translations.buttonDelete,
      onOk: () => deleteItem(item.key as string),
      cancelText: translations.cancel,
      className: `modalCrud${theme}`,
      centered: true,
      maskClosable: true,
      okCancel: true
    })
  }
  const operations = (record: any) => (
    <>
      <Tooltip placement="top" title={translations.edit}>
        <a>
          <EditFilled style={{ paddingLeft: '5px' }} onClick={() => updateModal(record)} />
        </a>
      </Tooltip>
      <Tooltip placement="top" title={translations.delete}>
        <a>
          <DeleteOutlined style={{ paddingLeft: '5px' }} onClick={() => deleteModal(record)} />
        </a>
      </Tooltip>
    </>
  )
  return (
    <>
      <TableData
        columns={ColumnFactory({
          translate: translations,
          operations: record => operations(record),
          columns: columns
        })}
        data={data}
        loading={false}
      />
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonsCrud titleCreate={translations.addNew} functionCreate={createModal} />
      </span>
    </>
  )
}

export default TableComponent
