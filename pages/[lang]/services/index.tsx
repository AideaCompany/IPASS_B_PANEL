import CreateItem from '@/components/crudFunctions/create'
//components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/services/columns'
import { formElements } from '@/components/services/formElements'
import FormItems from '@/components/services/formItems'
import TableData from '@/components/TableDatas'
import { setToken } from '@/graphql/config'
import { createService } from '@/graphql/services/mutations/createService'
//Lenguage
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import useData from '@/providers/DataContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllProductsFn } from '@/services/products'
import { getAllServices } from '@/services/services'
import { getAllServiceTypesFn } from '@/services/serviceTypes'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
//apollo
import { IProduct, IService, IServiceType, Paginated } from '@/types/types'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { gql } from '@apollo/client'
import * as cookie from 'cookie'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const services = (props: {
  localization: Localization
  lang: string
  page: number
  limit: number
  dataServiceType: IServiceType[]
  dataProducts: IProduct[]
}): JSX.Element => {
  //props
  const { localization, lang, page, limit, dataServiceType, dataProducts } = props
  //context
  const { privilege } = useData()
  const { permission } = useAuth()
  const router = useRouter()
  //state
  const [data, setData] = useState<IService[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [_, setPermissionPermission] = useState<IPermissionsPrivilege>()
  const [filters, setFilters] = useState<any>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [pagination, setPagination] = useState<Paginated<IService>>()

  //Effect
  useEffect(() => {
    ;(async () => {
      if (permission) {
        setLoading(true)
        setPermissionPermission(permission.permissions?.find(e => e.sectionName === 'Permission'))
        setActualPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'services'))
      }
    })()
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  useEffect(() => {
    getData()
  }, [filters])

  //functions
  const getData = async () => {
    setLoading(true)
    const result = await getAllServices(actualPage, actualLimit, filters)
    console.log(result)
    setPagination(result)
    setData(
      convertTotable(result.docs)
        .map(e => ({
          ...e,
          photo: e.photo ? { ...e.photo, key: `${process.env.NEXT_PUBLIC_S3}/${e.photo.key}` } : e.photo
        }))
        .reverse()
    )

    setLoading(false)
  }

  const beforeCreate = (item: IService) => {
    console.log(item)
    const newService = item
    return newService
  }

  const createButton = (
    <div className="ButtonsUp">
      <CreateItem
        actualPermission={actualPermission as IPermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createService)}
        formElements={formElements(dataServiceType, dataProducts)}
        afterCreate={getData}
        beforeCreate={beforeCreate}
        iconButton={true}
        FormItem={
          <FormItems dataProducts={dataProducts} dataServiceType={dataServiceType} isUpdate={false} translations={localization.translations} />
        }
      />
    </div>
  )

  const onchange = (_: any, filters: any, sorter: any) => {
    setFilters(formatFiltersTable(filters))
  }

  return (
    <>
      <MainLayout getData={getData} create={createButton} lang={lang} title={`${localization?.translations.titleSection} `}>
        <div>
          <TableData
            columns={columns({
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              after: getData,
              privileges: privilege,
              dataServiceType: dataServiceType,
              dataProducts: dataProducts
            })}
            data={data}
            loading={loading}
            onChange={onchange}
            scroll={{ x: 1500, y: '60vh' }}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} Servicios`,
              current: actualPage,
              onChange: page => {
                setActualPage(page)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, page }
                })
              },
              onShowSizeChange: (_, limit) => {
                setActualLimit(limit)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, limit }
                })
              }
            }}
          />
        </div>
      </MainLayout>
    </>
  )
}

export default React.memo(services)

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx?.req?.headers?.cookie
  if (token) {
    if (cookie.parse(token as string).authRenapPanel) {
      setToken(cookie.parse(token as string).authRenapPanel)
      const localization = getLocalizationProps(ctx, 'services')
      const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
      const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
      // const queriesNames = Object.keys(ctx.query).filter((e: string) => e !== 'page' && e !== 'limit' && e !== 'lang')
      // const filters = queriesNames.length > 0 && queriesNames.map(e => ({ [e]: ctx.query[e] as string }))
      const dataServiceType = await getAllServiceTypesFn()
      const dataProducts = await getAllProductsFn()
      return { props: { localization, page, limit, dataServiceType, dataProducts } }
    } else {
      return {
        notFound: true
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}
