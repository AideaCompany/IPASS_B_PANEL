import useLocationView from '@/providers/ViewLocationContext'
import { updateLocationFn } from '@/services/locations'
import { ILocation } from '@/types/types'
import { Button, Form, FormInstance, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import AdminLocation from './AdminLocation'
import InfoLocation from './InfoLocation/InfoLocation'
import MenuAdmin from './MenuAdmin'

const index = () => {
  const { actualLocation, setActualLocation, translate, lang } = useLocationView()
  const [current, setCurrent] = useState('info')
  const formRef = useRef<FormInstance<ILocation>>(null)
  const router = useRouter()

  const onChange = async () => {
    const values = await formRef.current?.validateFields()
    try {
      await updateLocationFn({ _id: actualLocation._id, ...values })
      message.success(translate.successfullyUpdated)
      setActualLocation(actualLocation)
      router.push('/[lang]/location', `/${lang}/location`)
    } catch (error) {
      message.error(translate.errorUpdated)
    }
  }
  const { device, ...rest } = actualLocation
  return (
    <>
      <div className={'container_view_location'}>
        <div className="container_views">
          <MenuAdmin current={current} setCurrent={setCurrent} />
          <div className={'elements_container'}>
            <Form initialValues={{ ...rest, device: device?._id }} ref={formRef}>
              {current === 'info' && <InfoLocation />}
              {current === 'admin' && <AdminLocation />}
            </Form>
          </div>
          <div className={'buttons'}>
            <>
              <Button onClick={onChange} type="primary" shape="round" htmlType="submit">
                {translate.save}
              </Button>
            </>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(index)
