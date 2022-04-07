//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/products/columns'
import { formElements } from '@/components/products/formElements'
import FormItems from '@/components/products/formItem'
import TableData from '@/components/TableDatas'
import { createProduct } from '@/graphql/product/mutation/createProduct'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllProductsFn } from '@/services/products'
import { IProduct, PermissionsPrivilege } from '@/types/types'
import { gql } from '@apollo/client'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface actualItem extends IProduct {}

const Products = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Products'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    const data = await getAllProductsFn()
    console.log(data)
    // setdata(await getAllProductsFn())
    setloading(false)
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as PermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createProduct)}
            formElements={formElements()}
            FormItem={<FormItems isUpdate={true} translations={localization.translations} />}
            afterCreate={getData}

            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <>
          <TableData
            columns={columns({
              translations: localization.translations,
              actualPermission: actualPermission as PermissionsPrivilege,
              permision: permission,
              lang: lang,
              after: getData
            })}
            data={data}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(Products)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'products')
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
