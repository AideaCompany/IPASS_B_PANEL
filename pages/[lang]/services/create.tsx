import MainLayout from '@/components/layout/Layout'
import FormComplements from '@/components/services/create/stepFour/formComplements'
import FormGeneralInformation from '@/components/services/create/stepOne/formGeneralInformation'
import Steps from '@/components/services/create/Steps'
import FormComercialInformation from '@/components/services/create/StepThree/formComercialInformation'
import FormResources from '@/components/services/create/stepTwo/formResources'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllBrands } from '@/services/brands'
import { getAllProductsFn } from '@/services/products'
import { createServiceFn, listAllServicesFn } from '@/services/services'
import { getAllServiceTypesFn } from '@/services/serviceTypes'
import { getAllStores } from '@/services/stores'
import { getAllSubServices } from '@/services/subServices'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { ICreateService } from '@/types/interfaces/services/MutationServices.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ISubService } from '@/types/interfaces/SubServices/SubServices.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: {
  localization: Localization
  lang: string
  stores: IStores[]
  subServices: ISubService[]
  serviceTypes: IServiceType[]
  products: IProduct[]
}) => {
  //#region props
  const { localization, lang, stores, subServices, serviceTypes, products } = props
  //#endregion props
  //#region providers
  const { setSpinning } = useAuth()
  //#endregion providers

  //#region ref
  const formRef = useRef<FormInstance<IService>>(null)
  const router = useRouter()
  //#endregion ref

  //#region  states
  const [error, setError] = useState('')
  const [data, setData] = useState<IService>()
  const [disabled, setDisabled] = useState(false)
  const [current, setCurrent] = useState(0)
  //#end region states

  //#region useEffect

  //#endregion useEffect

  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IService
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
    const newData = (await formRef.current?.validateFields()) as IService
    const finalData = { ...data, ...newData }
    setData(finalData)
    setSpinning(true)
    try {
      await createServiceFn(finalData as unknown as ICreateService)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/services', `/${lang}/services`)
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
                  <FormGeneralInformation
                    //@ts-ignore
                    inicialData={{ originFileObj: data?.photo, filename: data?.photo?.name }}
                    translate={localization.translations}
                    dataServiceType={serviceTypes}
                  />
                )}
                {current === 1 && <FormResources isUpdate={false} products={products} translate={localization.translations} />}
                {current === 2 && <FormComercialInformation isUpdate={false} translate={localization.translations} />}
                {current === 3 && (
                  <FormComplements isUpdate={false} subServices={subServices} stores={stores} translate={localization.translations} />
                )}
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
                  {current < 3 && (
                    <Form.Item noStyle>
                      <Button disabled={disabled} onClick={() => HandleChangeCurrent('next')} type="primary" shape="round" htmlType="submit">
                        {localization.translations.next}
                      </Button>
                    </Form.Item>
                  )}
                  {current === 3 && (
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
  const localization = getLocalizationProps(ctx, 'services')
  const services = await listAllServicesFn()
  const brands = await getAllBrands()
  const stores = await getAllStores()
  const serviceTypes = await getAllServiceTypesFn()
  const subServices = await (await getAllSubServices(1, 100, {})).docs
  const products = await getAllProductsFn()
  return { props: { localization, services, brands, stores, subServices, serviceTypes, products } }
}
