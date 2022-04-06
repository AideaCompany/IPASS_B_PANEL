//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/visitorBrand/columns'
import { formElements } from '@/components/visitorBrand/formElements'
import FormItems from '@/components/visitorBrand/formItem'
import { createVisitorBrand } from '@/graphql/visitorBrand/mutation/createVisitorBrand'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllVisitorBrand } from '@/services/visitorBrand'
import { getAllVisitorCategory } from '@/services/visitorCategory'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'
import { IVisitorBrand } from '@/types/interfaces/VistorBrand/VisitorBrand.interface'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

type actualItem = IVisitorBrand
const visitorCategory = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [categories, setCategories] = useState<IVisitorCategory[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'VisitorBrand'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    setdata(await getAllVisitorBrand())
    setCategories(await getAllVisitorCategory())
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
            mutation={gql(createVisitorBrand)}
            formElements={formElements(categories)}
            FormItem={<FormItems translations={localization.translations} categories={categories} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <TableData<IVisitorBrand>
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            lang: lang,
            categories: categories
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
  const localization = getLocalizationProps(ctx, 'visitorBrand')
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
