import MainLayout from '@/components/layout/Layout'
import SelectInMap from '@/components/stores/create/SelectInMap'
import SelectServices from '@/components/stores/create/SelectServices'
import Steps from '@/components/stores/create/Steps'
import FormGeneralInfo from '@/components/stores/create/StepTwo/FormGeneralInfo'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllServiceTypesFn } from '@/services/serviceTypes'
import { createStoresFn } from '@/services/stores'
import { listTimeZonesFn } from '@/services/timeZone'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { ICreateStores } from '@/types/interfaces/Stores/mutationStores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance, message } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { localization: Localization; lang: string; timeZone: ITimeZone[]; services: IServiceType[] }) => {
  //#region props
  const { localization, lang, timeZone, services } = props
  //#endregion props
  //#region providers
  const { setSpinning } = useAuth()
  //#endregion providers

  //#region ref
  const formRef = useRef<FormInstance<ICreateStores>>(null)
  const router = useRouter()
  //#endregion ref

  //#region  states
  const [error, setError] = useState('')
  const [data, setData] = useState<ICreateStores>()
  const [disabled, setDisabled] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  //Default center, Ciudad de guatemala
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({
    lat: 14.623526,
    lng: -90.516996
  })
  //#end region states

  //#region useEffect

  //#endregion useEffect

  //#region functions
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue() as ICreateStores
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
    const newData = (await formRef.current?.validateFields()) as ICreateStores
    const finalData = { ...data, ...newData }

    setData(finalData)
    setSpinning(true)
    try {
      await createStoresFn({ ...finalData, location: { lat: currentLocation.lat, lng: currentLocation.lng }, services: selectedServices })
      message.success(localization.translations.successfullyCreated)
      router.push('/[lang]/stores', `/${lang}/stores`)
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
                {current === 0 && <SelectInMap currentLoc={currentLocation} onChangeCurrentLocation={setCurrentLocation} />}
                {current === 1 && <FormGeneralInfo timeZone={timeZone} translate={localization.translations} />}
                {current === 2 && <SelectServices setSelectedServices={setSelectedServices} services={services} />}
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
  const localization = getLocalizationProps(ctx, 'stores')
  const timeZone = await listTimeZonesFn()
  const services = await getAllServiceTypesFn()
  return { props: { localization, timeZone, services } }
}
