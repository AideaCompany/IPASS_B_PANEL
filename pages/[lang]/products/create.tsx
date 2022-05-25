import MainLayout from '@/components/layout/Layout'
import FormItems1 from '@/components/products/create/stepOne/formItem1'
import Steps from '@/components/products/create/Steps'
import FormItems3 from '@/components/products/create/stepThree/formItem3'
import FormItems2 from '@/components/products/create/stepTwo/formItem2'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllBrands } from '@/services/brands'
import { createProductFn } from '@/services/products'
import { listAllServicesFn } from '@/services/services'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { ICreateProduct } from '@/types/interfaces/Product/MutationProduct.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string; services: IService[]; brands: IBrands[] }) => {
  //#region props
  const { localization, lang, brands, services } = props
  //#region
  const { setSpinning } = useAuth()
  //states

  //providers
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  //#region ref
  const formRef = useRef<FormInstance<IProduct>>(null)
  //#region  states

  const [error, setError] = useState('')
  const [data, setData] = useState<IProduct>()
  const [disabled, setDisabled] = useState(false)
  //#end region states
  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as IProduct
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
    const newData = (await formRef.current?.validateFields()) as IProduct
    const finalData = { ...data, ...newData }
    setData(finalData)
    setSpinning(true)
    try {
      await createProductFn(finalData as unknown as ICreateProduct)
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/products', `/${lang}/products`)
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
                {current === 0 && <FormItems1 isUpdate={false} brands={brands} translate={localization.translations} />}
                {current === 1 && (
                  <FormItems2
                    isUpdate={false}
                    translate={localization.translations}
                    //@ts-ignore
                    inicialData={{ originFileObj: data?.photo, filename: data?.photo?.name }}
                  />
                )}
                {current === 2 && <FormItems3 isUpdate={false} services={services} translate={localization.translations} />}
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
                  {current < 2 && (
                    <Form.Item noStyle>
                      <Button disabled={disabled} onClick={() => HandleChangeCurrent('next')} type="primary" shape="round" htmlType="submit">
                        {localization.translations.next}
                      </Button>
                    </Form.Item>
                  )}
                  {current === 2 && (
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
  const localization = getLocalizationProps(ctx, 'products')
  const services = await listAllServicesFn()
  const brands = await getAllBrands()
  return { props: { localization, services, brands } }
}
