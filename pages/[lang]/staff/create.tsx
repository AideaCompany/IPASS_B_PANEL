import MainLayout from '@/components/layout/Layout'
import FormItemsPersonal from '@/components/staff/create/StepOne/formItemPersonal'
import Steps from '@/components/staff/create/Steps'
import FormItemsLaboral from '@/components/staff/create/stepTwo/formItemLaboral'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listAllServicesFn } from '@/services/services'
import { createStaffFn } from '@/services/staff'
import { getAllStores } from '@/services/stores'
import { IService } from '@/types/interfaces/services/Services.interface'
import { ICreateStaff } from '@/types/interfaces/staff/mutationStaff.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string; stores: IStores[]; services: IService[] }) => {
  //#region props
  const { localization, lang, stores, services } = props
  //#region
  const { setSpinning } = useAuth()
  //states
  //providers
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  //#region ref
  const formRef = useRef<FormInstance<IStaff>>(null)
  //#region  states

  const [error, setError] = useState('')
  const [data, setData] = useState<IStaff>()
  const [disabled, setDisabled] = useState(false)
  //#end region states
  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IStaff
      setData(currentVal => ({ ...currentVal, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )
  const createProduct = async () => {
    const newData = (await formRef.current?.validateFields()) as IStaff
    const finalData = { ...data, ...newData }
    setData(finalData)
    setSpinning(true)
    try {
      await createStaffFn(finalData as unknown as ICreateStaff)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/staff', `/${lang}/staff`)
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
    <MainLayout hideButtons lang={lang} title={localization.translations.titleModalCreate}>
      <Form onValuesChange={validateForm} component={false} ref={formRef}>
        <div className="container_create_location flex">
          <div className="containerForms">
            <div className="stepsContainer">
              <Steps translate={localization.translations} current={current} />
            </div>
            <div className="elementsContainer">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}></div>
              <div className="elementsContainer">
                {current === 0 && (
                  <FormItemsPersonal
                    //@ts-ignore
                    inicialData={{ originFileObj: data?.photo, filename: data?.photo?.name }}
                    translate={localization.translations}
                  />
                )}
                {current === 1 && <FormItemsLaboral service={services} stores={stores} translate={localization.translations} />}
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
                      <Button disabled={false} onClick={createProduct} icon={<PlusOutlined />} shape="round" type="primary">
                        {localization.translations.titleModalCreate}
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
  const localization = getLocalizationProps(ctx, 'staff')
  const stores = await getAllStores()
  const services = await listAllServicesFn()
  return { props: { localization, stores, services } }
}
