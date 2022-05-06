//components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/services/columns'
import TableData from '@/components/TableDatas'
import { setToken } from '@/graphql/config'
//Lenguage
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import useData from '@/providers/DataContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllProductsFn } from '@/services/products'
import { getAllServices } from '@/services/services'
import { getAllServiceTypesFn } from '@/services/serviceTypes'
import { listStaffFn } from '@/services/staff'
import { getAllStores } from '@/services/stores'
import { getAllSubServices } from '@/services/subServices'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
//apollo
import { IProduct, IService, IServiceType, ISubService, Paginated } from '@/types/types'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import * as cookie from 'cookie'
//next
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const services = (props: {
  localization: Localization
  lang: string
  page: number
  limit: number
  dataServiceType: IServiceType[]
  dataProducts: IProduct[]
  staff: IStaff[]
  stores: IStores[]
  subServices: ISubService[]
}): JSX.Element => {
  //props
  const { localization, lang, page, limit, dataServiceType, dataProducts, staff, stores, subServices } = props
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
  const goToCreate = () => (
    <Tooltip title="Crear producto">
      <Link href={{ pathname: '/[lang]/services/create', query: { lang } }}>
        <a>
          <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
        </a>
      </Link>
    </Tooltip>
  )

  const getData = async () => {
    setLoading(true)
    const result = await getAllServices(actualPage, actualLimit, filters)
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

  const onchange = (_: any, filters: any, sorter: any) => {
    setFilters(formatFiltersTable(filters))
  }

  return (
    <>
      <MainLayout create={goToCreate()} getData={getData} lang={lang} title={`${localization?.translations.titleSection} `}>
        <div>
          <TableData
            columns={columns({
              staff,
              stores,
              subServices,
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
      const staff = (await listStaffFn(1, 100, {})).docs
      const stores = await getAllStores()
      const result = await getAllSubServices(page, limit, {})
      const subServices = convertTotable(result.docs)
      return { props: { localization, page, limit, dataServiceType, dataProducts, staff, stores, subServices } }
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
