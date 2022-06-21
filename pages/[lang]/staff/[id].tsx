import MainLayout from '@/components/layout/Layout'
import FormItemsPersonal from '@/components/staff/create/StepOne/formItemPersonal'
import Steps from '@/components/staff/create/Steps'
import FormItemsLaboral from '@/components/staff/create/stepTwo/formItemLaboral'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listAllServicesFn } from '@/services/services'
import { getStaffFn, updateStaffFn } from '@/services/staff'
import { getAllStores } from '@/services/stores'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IUpdateStaff } from '@/types/interfaces/staff/mutationStaff.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const update = (props: { localization: Localization; lang: string; stores: IStores[]; staff: IStaff; services: IService[] }) => {
  //#region props
  const { localization, lang, stores, staff, services } = props
  //#region
  const { setSpinning } = useAuth()
  //states

  //providers
  const [current, setCurrent] = useState(0)
  const router = useRouter()
  //#region ref
  const formRef = useRef<FormInstance<IStaff>>(null)
  //#region  states
  //@ts-ignore
  const [data, setData] = useState<IStaff>({
    photo: staff.photo
  })

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
    const finalData = { ...data, ...newData, _id: staff._id }
    setData(finalData)
    setSpinning(true)
    try {
      await updateStaffFn(finalData as unknown as IUpdateStaff)
      message.success(localization.translations.successfullyUpdated)
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

  return (
    <MainLayout hideButtons lang={lang} title={localization.translations.titleModalUpdate}>
      <Form
        initialValues={{ ...staff, stores: (staff.stores as IStores[])?.map(e => e?._id), services: (staff.services as IService[])?.map(e => e._id) }}
        component={false}
        ref={formRef}
      >
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
                    inicialData={{ originFileObj: data?.photo, filename: data?.photo?.name, key: data?.photo?.key }}
                    translate={localization.translations}
                    isUpdate={true}
                  />
                )}
                {current === 1 && <FormItemsLaboral service={services} isUpdate={true} stores={stores} translate={localization.translations} />}
              </div>

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
                      <Button onClick={() => HandleChangeCurrent('next')} type="primary" shape="round" htmlType="submit">
                        {localization.translations.next}
                      </Button>
                    </Form.Item>
                  )}
                  {current === 1 && (
                    <Form.Item noStyle>
                      <Button disabled={false} onClick={createProduct} icon={<PlusOutlined />} shape="round" type="primary">
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

export default React.memo(update)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const localization = getLocalizationProps(ctx, 'staff')
    const stores = await getAllStores()
    const staff = await getStaffFn(ctx.query.id as string)
    const services = await listAllServicesFn()
    return { props: { localization, stores, staff, services } }
  } catch (error) {
    return {
      notFound: true
    }
  }
}
