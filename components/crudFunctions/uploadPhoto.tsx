/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fileType } from '@/types/typeTemplate'

import { PlusOutlined } from '@ant-design/icons'
import { Form, message, Modal, Upload } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { capitalize } from 'fogg-utils'
import { ITranslations } from 'i18n/types'
import React, { useState } from 'react'

const dummyRequest = ({ onSuccess }: { onSuccess: (value: string) => void }) => {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const uploadPhoto = (props: { name: string; translate: ITranslations; inicialData?: fileType; required: boolean; size?: string }) => {
  const { name, translate, inicialData, required, size } = props
  console.log(inicialData)
  //@ts-ignore
  const [fileList, setfileList] = useState<UploadFile[]>(
    //@ts-ignore
    inicialData && (inicialData?.key || inicialData.originFileObj)
      ? [
          {
            uid: inicialData._id ? inicialData._id : '-1',
            name: inicialData && inicialData.filename ? inicialData.filename : '',
            status: 'done',
            //@ts-ignore
            originFileObj: inicialData.originFileObj ? inicialData.originFileObj : null,
            url: inicialData.key
          }
        ]
      : []
  )
  const [previewImage, setpreviewImage] = useState('')
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewTitle, setpreviewTitle] = useState('')

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      //@ts-ignore
      file.preview = await getBase64(file.originFileObj as Blob)
    }
    //@ts-ignore
    setpreviewImage((file.url as string) || (file.preview as string))
    //@ts-ignore
    setpreviewVisible(true)
    //@ts-ignore
    setpreviewTitle((file.name as string) || (file.url as string).substring((file.url as string).lastIndexOf('/') + 1))
  }
  const handleChange = (input: { file: any; fileList: any }) => {
    const { file, fileList } = input
    let err = false
    console.log(input)
    if (fileList.length > 0) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml'
      if (!isJpgOrPng) {
        message.error('Solo puedes subir archivos JPG/PNG/SVG!')
        err = true
        setfileList([])
      }
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        message.error('El peso de la imagen excede el máximo permitido (10MB)')
        err = true
        setfileList([])
      }
      if (!err) {
        setfileList(fileList as UploadFile<any>[])
      }
    } else {
      setfileList([])
    }
  }
  const normalize = ({ fileList }: { file: any; fileList: UploadFile<any>[] }) => {
    try {
      return fileList[0].originFileObj
    } catch (error) {
      return []
    }
  }

  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>{`Sube o arrastra una foto ${size ? size : ''}`}</div>
    </div>
  )
  return (
    <>
      <Form.Item
        name={name}
        normalize={normalize}
        style={{ height: '200px' }}
        rules={[{ required, message: translate[`error${capitalize(Array.isArray(name) ? name[name.length - 1] : name)}`] }]}
      >
        <Upload
          //@ts-ignore
          customRequest={dummyRequest}
          name="avatar"
          listType="picture-card"
          fileList={fileList}
          //@ts-ignore
          onChange={handleChange}
          onPreview={e => handlePreview(e)}
        >
          {fileList?.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setpreviewVisible(false)}>
        <img alt="fotografiá" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default React.memo(uploadPhoto)
