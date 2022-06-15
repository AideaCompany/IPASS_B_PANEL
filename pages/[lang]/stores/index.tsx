//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/stores/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listAllServicesFn } from '@/services/services'
import { getAllStores } from '@/services/stores'
import { listTimeZonesFn } from '@/services/timeZone'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const visitorCategory = (props: { localization: Localization; lang: string; timeZone: ITimeZone[]; services: IService[] }) => {
  //props
  const { localization, lang, timeZone, services } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<IStores[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'stores'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    setdata(await getAllStores())
    setloading(false)
  }

  //functions
  const goToCreate = () => (
    <Tooltip title="Crear stores">
      <Link href={{ pathname: '/[lang]/stores/create', query: { lang } }}>
        <a>
          <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
        </a>
      </Link>
    </Tooltip>
  )
  return (
    <>
      <MainLayout create={goToCreate()} getData={getData} lang={lang} title={localization?.translations.titleSection}>
        <TableData
          columns={columns({
            services,
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            timeZone,
            lang: lang,
            after: getData
          })}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const localization = getLocalizationProps(ctx, 'stores')
  const timeZone = await listTimeZonesFn()
  const services = await listAllServicesFn()
  return { props: { localization, timeZone, services } }
}
