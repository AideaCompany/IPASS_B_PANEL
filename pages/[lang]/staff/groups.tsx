//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/staff/groups/columns'
import { formElements } from '@/components/staff/groups/formElements'
import FormItem from '@/components/staff/groups/formItem'

//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllLocationActive } from '@/services/locations'

import { gql } from 'apollo-boost'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { createStaff } from '@/graphql/Staff/mutation/createStaff'

type actualItem = IGroupWorker

const masterLocation = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data] = useState<actualItem[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Gruposstaffer'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setLoading(true)
    // setData(await listGroupWorkerIfExistF())
    setLocations(await getAllLocationActive())
    setLoading(false)
  }

  const create = (
    <>
      <CreateItem
        paramTitle="titleModalCreateGroup"
        iconButton={true}
        actualPermission={actualPermission as IPermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createStaff)}
        afterCreate={getData}
        formElements={formElements(locations)}
        FormItem={<FormItem location={locations} translations={localization.translations} />}
      />
    </>
  )

  return (
    <>
      <MainLayout create={create} getData={getData} lang={lang} title={'Grupos de staffers'}>
        <TableData
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            after: getData,
            formItem: <FormItem location={locations} translations={localization.translations} />,
            location: locations
          })}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(masterLocation)

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'worker')
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
