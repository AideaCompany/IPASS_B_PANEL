//react
//Components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/timeZone/columns'
import { formElements } from '@/components/timeZone/formElements'
import CreateItem from '@/components/crudFunctions/create'

//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listTimeZonesFn } from '@/services/timeZone'

//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { createTimeZone } from '@/graphql/timeZone/mutations/createTimeZone'
import FormItems from '@/components/timeZone/formItem'
import moment, { Moment } from 'moment-timezone'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

type actualItem = ITimeZone
const visitorCategory = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'timeZone'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    const listData = await listTimeZonesFn()
    setdata(listData.map(e => ({ ...e, start: moment(e.start, 'HH:mm'), end: moment(e.end, 'HH:mm') })))
    setloading(false)
  }

  const beforeCreate = (currentData: ITimeZone) => {
    currentData.start = (currentData.start as Moment).format('HH:mm')
    currentData.end = (currentData.end as Moment).format('HH:mm')
    return currentData
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as IPermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createTimeZone)}
            formElements={formElements()}
            afterCreate={getData}
            beforeCreate={beforeCreate}
            FormItem={<FormItems translations={localization.translations} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
        hideButtons={false}
      >
        <TableData
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
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

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'timeZone')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
