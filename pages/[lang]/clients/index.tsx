import columns from '@/components/clients/columns'
import UploadExcel from '@/components/clients/UploadExcel'
//components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import { setToken } from '@/graphql/config'
//Lenguage
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import useData from '@/providers/DataContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllApps } from '@/services/apps'
import { getAllClients } from '@/services/clients'
import { getAllLocationActive } from '@/services/locations'
import { listTimeZonesFn } from '@/services/timeZone'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IPaginated } from '@/types/interfaces/graphqlTypes'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
//apollo

import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import * as cookie from 'cookie'
//next
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const clients = (props: { localization: Localization; lang: string; page: number; limit: number }): JSX.Element => {
  //props
  const { localization, lang, page, limit } = props
  //context
  const { privilege } = useData()
  const { permission } = useAuth()
  const router = useRouter()
  //state
  const [data, setData] = useState<IClient[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [_, setPermissionPermission] = useState<IPermissionsPrivilege>()
  const [filters, setFilters] = useState<any>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [pagination, setPagination] = useState<IPaginated<IClient>>()
  //Effect
  useEffect(() => {
    ;(async () => {
      if (permission) {
        setLoading(true)
        setPermissionPermission(permission.permissions?.find((e: any) => e.sectionName === 'Permission'))
        setActualPermission(permission.permissions?.find((e: any) => e.sectionName?.toLocaleLowerCase() === 'clients'))
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

    const result = await getAllClients(actualPage, actualLimit, filters)

    setPagination(result)
    setData(convertTotable(result.docs).reverse())

    setLoading(false)
  }

  const goToCreate = () => (
    <div className="ButtonsUp">
      <UploadExcel reload={getData} translations={localization.translations} />
      <Tooltip title="Crear cliente">
        <Link href={{ pathname: '/[lang]/clients/create', query: { lang } }}>
          <a>
            <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
          </a>
        </Link>
      </Tooltip>
    </div>
  )
  const onchange = (_: any, filters: any, sorter: any) => {
    setFilters(formatFiltersTable(filters))
  }

  return (
    <>
      <MainLayout getData={getData} create={goToCreate()} lang={lang} title={`${localization?.translations.titleSection} `}>
        <div>
          <TableData
            columns={columns({
              lang,
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              after: getData,
              privileges: privilege
            })}
            data={data}
            loading={loading}
            onChange={onchange}
            scroll={{ x: 1500, y: '60vh' }}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} Cliente`,
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

export default React.memo(clients)

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx?.req?.headers?.cookie
  if (token) {
    if (cookie.parse(token as string).authRenapPanel) {
      setToken(cookie.parse(token as string).authRenapPanel)
      const localization = getLocalizationProps(ctx, 'clients')
      const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
      const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
      // const queriesNames = Object.keys(ctx.query).filter((e: string) => e !== 'page' && e !== 'limit' && e !== 'lang')
      // const filters = queriesNames.length > 0 && queriesNames.map(e => ({ [e]: ctx.query[e] as string }))
      const locations = await getAllLocationActive()
      const timeZone = await listTimeZonesFn()
      const apps = await getAllApps()
      return { props: { localization, page, limit, locations, timeZone, apps } }
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
