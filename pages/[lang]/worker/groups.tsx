//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/worker/groups/columns'
import { formElements } from '@/components/worker/groups/formElements'
import FormItem from '@/components/worker/groups/formItem'
import { createGroupWorker } from '@/graphql/worker/mutation/createGroupWorker'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllLocationActive } from '@/services/locations'
import { listGroupWorkerIfExistFn } from '@/services/workers'
import { IGroupWorker, ILocation, PermissionsPrivilege } from '@/types/types'
import { gql } from 'apollo-boost'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface actualItem extends IGroupWorker {}

const masterLocation = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'GruposTrabajador'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setLoading(true)
    setData(await listGroupWorkerIfExistFn())
    setLocations(await getAllLocationActive())
    setLoading(false)
  }

  const create = (
    <>
      <CreateItem
        paramTitle="titleModalCreateGroup"
        iconButton={true}
        actualPermission={actualPermission as PermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createGroupWorker)}
        afterCreate={getData}
        formElements={formElements(locations)}
        FormItem={<FormItem location={locations} translations={localization.translations} />}
      />
    </>
  )

  return (
    <>
      <MainLayout create={create} getData={getData} lang={lang} title={'Grupos de trabajadores'}>
        <TableData
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as PermissionsPrivilege,
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

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'worker')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
