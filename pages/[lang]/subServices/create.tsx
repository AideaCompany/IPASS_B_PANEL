import MainLayout from '@/components/layout/Layout'
import FormGeneralInformation from '@/components/services/create/stepOne/formGeneralInformation'
import Steps from '@/components/services/create/Steps'
import FormComercialInformation from '@/components/services/create/StepThree/formComercialInformation'
import FormResources from '@/components/services/create/stepTwo/formResources'
import FormComplements from '@/components/subServices/create/stepFour/formComplements'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllBrands } from '@/services/brands'
import { getAllProductsFn } from '@/services/products'
import { listAllServicesFn } from '@/services/services'
import { getAllServiceTypesFn } from '@/services/serviceTypes'
import { createSubServiceFn } from '@/services/subServices'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { ICreateSubService } from '@/types/interfaces/SubServices/MutationSubServices.interface'
import { IProducts } from '@/types/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string; products: IProduct[]; serviceTypes: IServiceType[] }) => {
  //#region props
  const { localization, products, lang, serviceTypes } = props
  //#endregion props
  const router = useRouter()
  //#region providers
  const { setSpinning } = useAuth()

  //#endregion providers

  //#region ref
  const formRef = useRef<FormInstance<IProducts>>(null)
  //#endregion ref

  //#region  states
  const [error, setError] = useState('')
  const [data, setData] = useState<IProducts>()
  const [disabled, setDisabled] = useState(false)
  const [current, setCurrent] = useState(0)
  //#end region states

  //#region useEffect

  //#endregion useEffect

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
  const createProduct = async () => {
    const newData = (await formRef.current?.validateFields()) as IProducts
    const finalData = { ...data, ...newData }
    setData(finalData)
    setSpinning(true)
    try {
      await createSubServiceFn(finalData as unknown as ICreateSubService)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/subServices', `/${lang}/subServices`)
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
                {current === 3 && <FormComplements isUpdate={false} translate={localization.translations} />}
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
  const localization = getLocalizationProps(ctx, 'subServices')
  const services = await listAllServicesFn()
  const brands = await getAllBrands()

  const serviceTypes = await getAllServiceTypesFn()

  const products = await getAllProductsFn()

  return { props: { localization, services, brands, serviceTypes, products } }
}
