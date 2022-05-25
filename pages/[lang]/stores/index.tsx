//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/stores/columns'
import { formElements } from '@/components/stores/formElements'
import FormItems from '@/components/stores/formItem'
import TableData from '@/components/TableDatas'
import { createStores } from '@/graphql/stores/mutations/createStores'
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
import { gql } from '@apollo/client'
//next
import { GetServerSidePropsContext } from 'next'
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

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as IPermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createStores)}
            formElements={formElements(timeZone, services)}
            FormItem={<FormItems services={services} timeZone={timeZone} isUpdate={true} translations={localization.translations} />}
            afterCreate={getData}
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
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
