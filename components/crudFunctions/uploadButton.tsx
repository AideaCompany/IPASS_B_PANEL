import { fileType } from '@/types/typeTemplate'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Upload } from 'antd'
import { Translations } from 'i18n/types'
import React, { useState } from 'react'

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}
const uploadButton = (props: { translate: Translations; inicialProps: any; inicialData?: fileType }) => {
  const { translate, inicialProps, inicialData } = props
  const [fileList, setfileList] = useState<any[]>(
    inicialData
      ? [
          {
            uid: '-1',
            name: inicialData && inicialData.filename ? inicialData.filename : '',
            status: 'done',
            url: inicialData.key
          }
        ]
      : []
  )

  return (
    <Form.Item {...inicialProps} getValueFromEvent={normFile}>
      <Upload
        onChange={({ file, fileList }) => {
          setfileList(fileList)
        }}
        fileList={fileList}
        name="logo"
        listType="picture"
      >
        {fileList.length < 1 ? (
          <Button shape={'round'} icon={<UploadOutlined />}>
            {translate.upload}
          </Button>
        ) : (
          <></>
        )}
      </Upload>
    </Form.Item>
  )
}

export default uploadButton
