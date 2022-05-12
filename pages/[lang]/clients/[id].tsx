import FormItemsInformationClient from '@/components/clients/create/stepOne/formItemsInformationClient'
import Steps from '@/components/clients/create/Steps'
import FormItemsComercialClients from '@/components/clients/create/stepTwo/formItemsComercialClients'
import MainLayout from '@/components/layout/Layout'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getClientFn, updateClientFn } from '@/services/clients'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { ICreateClient } from '@/types/interfaces/Clients/MutationClient.interface'
import { IProducts } from '@/types/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import moment from 'moment'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string; client: IClient }) => {
  const router = useRouter()
  //#region props
  const { localization, lang, client } = props
  //#region
  const { setSpinning } = useAuth()
  //providers
  const [current, setCurrent] = useState(0)

  //#region ref
  const formRef = useRef<FormInstance<IProducts>>(null)
  //#region  states

  const [error, setError] = useState('')
  const [data, setData] = useState<IProducts>()
  const [disabled, setDisabled] = useState(false)
  //#end region states
  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IProducts
      setData(currentVal => ({ ...currentVal, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )
  const updateClient = async () => {
    const newData = (await formRef.current?.validateFields()) as IProducts
    const finalData = { ...data, ...newData, _id: client._id }
    setData(finalData)
    setSpinning(true)
    try {
      await updateClientFn(finalData as unknown as ICreateClient)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/clients', `/${lang}/clients`)
    } catch (currentError) {
      // manageMentError(
      //   currentError as {
      //     graphQLErrors: {
      //       message: string
      //     }[]
      //   }
      // )
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

  return (
    <MainLayout hideButtons lang={lang} title={localization.translations.titleModalUpdate}>
      <Form initialValues={{ ...client, age: moment(client.age) }} onValuesChange={validateForm} component={false} ref={formRef}>
        <div className="container_create_location flex">
          <div className="containerForms">
            <div className="stepsContainer">
              <Steps translate={localization.translations} current={current} />
            </div>
            <div className="elementsContainer">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}></div>
              <div className="elementsContainer">
                {current === 0 && <FormItemsInformationClient isUpdate={true} inicialData={client.photo} translations={localization.translations} />}
                {current === 1 && <FormItemsComercialClients isUpdate={true} translations={localization.translations} />}
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
                      <Button disabled={false} onClick={updateClient} icon={<PlusOutlined />} shape="round" type="primary">
                        {localization.translations.titleModalUpdate}
                      </Button>
                    </Form.Item>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </MainLayout>
  )
}

export default React.memo(create)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const localization = getLocalizationProps(ctx, 'clients')

  try {
    const client = await getClientFn(ctx.query.id as string)

    return { props: { localization, client } }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
