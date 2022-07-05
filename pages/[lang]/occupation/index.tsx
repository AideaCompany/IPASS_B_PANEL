//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/occupation/columns'
import { formElements } from '@/components/occupation/formElements'
import FormItems from '@/components/occupation/formItem'
import TableData from '@/components/TableDatas'
import { createOccupation } from '@/graphql/occupation/mutation/createOccupation'

//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listOccupationFn } from '@/services/occupation'
import { IOccupation } from '@/types/interfaces/Occupation/occupation.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

type actualItem = IOccupation
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
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'occupation'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    setdata(await listOccupationFn())
    setloading(false)
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            afterCreate={getData}
            actualPermission={actualPermission as IPermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createOccupation)}
            formElements={formElements()}
            FormItem={<FormItems translations={localization.translations} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <TableData<IOccupation>
          columns={columns({
            after: getData,
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            lang: lang
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
  const localization = getLocalizationProps(ctx, 'apps')
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
