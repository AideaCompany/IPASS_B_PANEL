import { fileType } from '@/types/typeTemplate'

import { PlusOutlined } from '@ant-design/icons'
import { Form, message, Modal, Upload } from 'antd'
import { capitalize } from 'fogg-utils'
import { Translations } from 'i18n/types'
import React, { useState } from 'react'

const dummyRequest = ({ file, onSuccess }: any) => {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const uploadPhoto = (props: { name: any; translate: Translations; inicialData?: fileType; required: boolean; size?: string }) => {
  const { name, translate, inicialData, required, size } = props
  const [fileList, setfileList] = useState<any[]>(
    inicialData && (inicialData?.key || (inicialData as any).originFileObj)
      ? [
          {
            uid: inicialData._id ? inicialData._id : '-1',
            name: inicialData && inicialData.filename ? inicialData.filename : '',
            status: 'done',
            originFileObj: (inicialData as any).originFileObj ? (inicialData as any).originFileObj : null,
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
      file.preview = await getBase64(file.originFileObj)
    }
    setpreviewImage(file.url || file.preview)
    setpreviewVisible(true)
    setpreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleChange = (input: { file: any; fileList: any }) => {
    const { file, fileList } = input
    var err = false
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
        setfileList(fileList)
      }
    } else {
      setfileList([])
    }
  }
  const normalize = ({ fileList }: { file: any; fileList: any }) => {
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
        rules={[{ required, message: translate[`error${capitalize(Array.isArray(name) ? name[name.length - 1] : name)}`] }]}
      >
        <Upload
          customRequest={dummyRequest}
          name="avatar"
          listType="picture-card"
          fileList={fileList}
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
