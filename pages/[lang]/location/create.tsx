import MainLayout from '@/components/layout/Layout'
import InfoLocationForm from '@/components/location/create/stepOne/InfoLocationForm'
import Steps from '@/components/location/create/Steps'
import AdminsLocationForm from '@/components/location/create/stepTwo/AdminsLocationForm'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { LocationProvider } from '@/providers/LocationContext'
import { createLocationFn } from '@/services/locations'
import { ILocation } from '@/types/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { Localization } from 'i18n/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string }) => {
  //#region props
  const { localization, lang } = props
  //#end region props
  const router = useRouter()
  //#region
  const { setSpinning } = useAuth()
  //#region

  //#region ref
  const formRef = useRef<FormInstance<ILocation>>(null)
  //#end region ref

  //#region  states
  const [current, setCurrent] = useState(0)
  const [error, setError] = useState('')
  const [data, setData] = useState<ILocation>()
  const [disabled, setDisabled] = useState(false)
  //#end region states

  //#region functions
  const HandleChangeCurrent = useCallback(
    async (type: 'next' | 'back') => {
      const data = formRef.current?.getFieldsValue() as ILocation
      setData(current => ({ ...current, ...data }))
      type === 'next' ? setCurrent(current + 1) : setCurrent(current - 1)
    },
    [current]
  )

  const manageMentError = (error: any) => {
    if (error['graphQLErrors'][0].message.includes('E11000 duplicate')) {
      message.error({ content: localization.translations.serialDuplicated, key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

  const create = async () => {
    const newData = (await formRef.current?.validateFields()) as ILocation
    const finalData = { ...data, ...newData }
    setData(finalData)
    setSpinning(true)
    try {
      await createLocationFn(finalData)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/location', `/${lang}/location`)
    } catch (error: any) {
      console.error(error)
      manageMentError(error)
    } finally {
      setSpinning(false)
    }
  }

  const validateForm = async () => {
    formRef.current
      ?.validateFields()
      .then(() => {
        setError('')
        setDisabled(false)
      })
      .catch(async (error: any) => {
        if (error.errorFields.length > 0) {
          if (error.errorFields[0].name.find((name: string) => name === 'admins')) {
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
      <LocationProvider validate={validateForm} setDisabled={setDisabled} formRef={formRef} data={data}>
        <Form onValuesChange={validateForm} component={false} ref={formRef}>
          <div className="container_create_location flex">
            <div className="containerForms">
              <div className="stepsContainer">
                <Steps translate={localization.translations} current={current} />
              </div>
              <div className="elementsContainer">
                {current === 0 && <InfoLocationForm translate={localization.translations} />}
                {current === 1 && <AdminsLocationForm translate={localization.translations} />}
              </div>
              {error && <div className="error">{error}</div>}
              <div className="buttons">
                <>
                  {current > 0 && (
                    <Form.Item noStyle>
                      <Button htmlType="submit" style={{ marginRight: 10 }} onClick={() => HandleChangeCurrent('back')} shape="round" type="default">
                        {localization.translations.return}
                      </Button>
                    </Form.Item>
                  )}
                  {current < 1 && (
                    <Form.Item noStyle>
                      <Button disabled={disabled} onClick={() => HandleChangeCurrent('next')} type="primary" shape="round" htmlType="submit">
                        {localization.translations.next}
                      </Button>
                    </Form.Item>
                  )}
                  {current === 1 && (
                    <Form.Item noStyle>
                      <Button disabled={false} onClick={create} icon={<PlusOutlined />} shape="round" type="primary">
                        {localization.translations.titleModalCreate}
                      </Button>
                    </Form.Item>
                  )}
                </>
              </div>
            </div>
          </div>
        </Form>
      </LocationProvider>
    </MainLayout>
  )
}

export default React.memo(create)
export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'location')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
