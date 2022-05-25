import MainLayout from '@/components/layout/Layout'
import Payment from '@/components/schedule/Create/Payment'
import SelectHours from '@/components/schedule/Create/SelectHours'
import SelectServices from '@/components/schedule/Create/SelectService'
import Steps from '@/components/schedule/Create/Steps'
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllClients } from '@/services/clients'
import { listAllServicesFn } from '@/services/services'
import { listStaffFn } from '@/services/staff'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, FormInstance } from 'antd'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useRef, useState } from 'react'

const create = (props: { clients: IClient[]; localization: Localization; lang: string; services: IService[]; staff: IStaff[] }) => {
  //#region props
  const { localization, lang, services, clients, staff } = props
  //#region
  const { setSpinning } = useAuth()
  //providers
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState({})
  const router = useRouter()
  //#region ref
  const formRef = useRef<FormInstance>(null)
  const HandleChangeCurrent = useCallback(
    (type: 'next' | 'back') => {
      const currentData = formRef.current?.getFieldsValue()
      setData(currentVal => ({ ...currentVal, ...currentData }))
      if (type === 'next') {
        setCurrent(current + 1)
      } else {
        setCurrent(current - 1)
      }
    },
    [current]
  )
  const createSchedule = () => {}
  return (
    <MainLayout hideButtons lang={lang} title={localization.translations.titleModalCreate}>
      <Form component={false} ref={formRef}>
        <div className="container_create_location flex">
          <div className="containerForms">
            <div className="stepsContainer">
              <Steps translate={localization.translations} current={current} />
            </div>
            <div className="elementsContainer">
              {current === 0 && <SelectServices staff={staff} clients={clients} translate={localization.translations} services={services} />}
              {current === 1 && <SelectHours />}
              {current === 2 && <Payment />}
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
                {current < 2 && (
                  <Form.Item noStyle>
                    <Button onClick={() => HandleChangeCurrent('next')} type="primary" shape="round" htmlType="submit">
                      {localization.translations.next}
                    </Button>
                  </Form.Item>
                )}
                {current === 2 && (
                  <Form.Item noStyle>
                    <Button disabled={false} onClick={createSchedule} icon={<PlusOutlined />} shape="round" type="primary">
                      {localization.translations.titleModalCreate}
                    </Button>
                  </Form.Item>
                )}
              </>
            </div>
          </div>
        </div>
      </Form>
    </MainLayout>
  )
}

export default create

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'schedule')
  const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
  const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
  const services = await listAllServicesFn()
  const clients = (await getAllClients(1, 10, {})).docs
  const staff = (await listStaffFn(1, 10, {})).docs
  return { props: { localization, page, limit, services, clients, staff } }
}
