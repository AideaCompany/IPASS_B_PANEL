import DeviceForm from '@/components/device/create/DeviceForm'
import MainLayout from '@/components/layout/Layout'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { createDeviceFn } from '@/services/device'
import { IDevice } from '@/types/interfaces/Device/Device.interface'
import { ICreateDevice } from '@/types/interfaces/Device/MutationDevice.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { Localization } from 'i18n/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

const createDevice = (props: { localization: Localization; lang: string }) => {
  //#region props
  const { localization, lang } = props
  //#end region props
  const router = useRouter()
  //#region
  const { setSpinning } = useAuth()
  //#region

  //#region ref
  const formRef = useRef<FormInstance<IDevice>>(null)
  //#end region ref

  //#region  states
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(false)
  //#end region states

  //#region functions

  const manageMentError = (currentError: { graphQLErrors: { message: string }[] }) => {
    if (currentError['graphQLErrors'][0].message.includes('E11000 duplicate')) {
      message.error({ content: localization.translations.serialDuplicated, key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

  const create = async () => {
    //@ts-ignore
    const newData = (await formRef.current?.validateFields()) as ICreateDevice
    setSpinning(true)
    try {
      await createDeviceFn(newData)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/device', `/${lang}/device`)
    } catch (currentError) {
      manageMentError(currentError as { graphQLErrors: { message: string }[] })
    } finally {
      setSpinning(false)
    }
  }

  const validateForm = () => {
    formRef.current
      ?.validateFields()
      .then(() => {
        setError('')
        setDisabled(false)
      })
      .catch((currentError: { errorFields: { name: string[] }[] }) => {
        if (currentError.errorFields.length > 0) {
          if (currentError.errorFields[0].name.find((name: string) => name === 'admins')) {
            setError(localization.translations.selectMinimumAdmin)
            setDisabled(true)
          } else {
            setError(localization.translations.allFieldsAreRequired)
            setDisabled(true)
          }
        } else {
          setError('')
          setDisabled(false)
        }
      })
  }

  //#end region functions
  return (
    <MainLayout hideButtons={true} lang={lang} title={localization?.translations.titleModalCreate}>
      {/* <LocationProvider validate={validateForm} setDisabled={setDisabled} formRef={formRef} data={data}> */}
      <Form onValuesChange={validateForm} component={false} ref={formRef}>
        <div className="container_create_location flex">
          <div className="containerForms">
            <div className="elementsContainer"></div>
            {error && <div className="error">{error}</div>}
            <DeviceForm translate={localization.translations} validate={validateForm} />
            <div className="buttons">
              <Form.Item noStyle>
                <Button disabled={disabled} onClick={create} icon={<PlusOutlined />} shape="round" type="primary">
                  {localization.translations.titleModalCreate}
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
      {/* </LocationProvider> */}
    </MainLayout>
  )
}

export default React.memo(createDevice)
export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'device')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
