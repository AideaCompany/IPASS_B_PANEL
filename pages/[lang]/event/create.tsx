import InfoEventForm from '@/components/event/create/stepOne/InfoEventForm'
import Steps from '@/components/event/create/Steps'
import GuestsEventForm from '@/components/event/create/stepTwo/GuestsEventForm'
import MainLayout from '@/components/layout/Layout'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { createEventFn } from '@/services/events'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { ICreateEvent } from '@/types/interfaces/Event/MutationEvent.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { Localization } from 'i18n/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const createEvent = (props: { localization: Localization; lang: string }) => {
  //#region props
  const { localization, lang } = props
  //#end region props
  const router = useRouter()
  //#region
  const { setSpinning } = useAuth()
  //#region

  //#region ref
  const formRef = useRef<FormInstance<IEvent>>(null)
  //#end region ref

  //#region  states
  const [current, setCurrent] = useState(0)
  const [error, setError] = useState('')
  const [data, setData] = useState<IEvent>()
  const [disabled, setDisabled] = useState(false)
  //#end region states

  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IEvent
      setData(currentValue => ({ ...currentValue, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )

  const manageMentError = (currentError: { graphQLErrors: { message: string }[] }) => {
    if (currentError['graphQLErrors'][0].message.includes('E11000 duplicate')) {
      message.error({ content: localization.translations.serialDuplicated, key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

  const create = async () => {
    //@ts-ignore
    const newData = (await formRef.current?.validateFields()) as ICreateEvent
    const finalData = { ...data, ...newData }
    //@ts-ignore
    setData(finalData)
    setSpinning(true)
    try {
      if (finalData.rangeTime) {
        const [start, end] = finalData.rangeTime
        finalData.start = start
        finalData.end = end
        delete finalData.rangeTime
      }
      await createEventFn(finalData)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/event', `/${lang}/event`)
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
      .catch((actualError: { errorFields: { name: string[] }[] }) => {
        if (actualError.errorFields.length > 0) {
          if (actualError.errorFields[0].name.find((name: string) => name === 'admins')) {
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
      <Form onValuesChange={validateForm} initialValues={{ onlyAuthUser: true, open: true }} component={false} ref={formRef}>
        <div className="container_create_location flex">
          <div className="containerForms">
            <div className="stepsContainer">
              <Steps translate={localization.translations} current={current} />
            </div>
            <div className="elementsContainer">
              {current === 0 && <InfoEventForm translate={localization.translations} validate={validateForm} />}
              {current === 1 && <GuestsEventForm />}
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
                    <Button disabled={disabled} onClick={create} icon={<PlusOutlined />} shape="round" type="primary">
                      {localization.translations.titleModalCreate}
                    </Button>
                  </Form.Item>
                )}
              </>
            </div>
          </div>
        </div>
      </Form>
      {/* </LocationProvider> */}
    </MainLayout>
  )
}

export default React.memo(createEvent)
export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'event')
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
