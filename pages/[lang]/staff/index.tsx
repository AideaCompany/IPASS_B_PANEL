//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/staff/columns'
import UploadExcel from '@/components/staff/UploadExcel'
import TableData from '@/components/TableDatas'
import { setToken } from '@/graphql/config'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllApps } from '@/services/apps'
import { getAllLocationActive } from '@/services/locations'
import { listStaffFn } from '@/services/staff'
import { listTimeZonesFn } from '@/services/timeZone'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import * as cookie from 'cookie'
//next
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type actualItem = IStaff
const staff = (props: {
  localization: Localization
  lang: string
  page: number
  limit: number
  groups: IGroupWorker[]
  locations: ILocation[]
  timeZone: ITimeZone[]
  apps: IApps[]
}) => {
  //#region hooks
  const router = useRouter()
  //#endregion hooks

  //props
  const { localization, lang, page, limit } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [pagination, setPagination] = useState<IPaginated<IStaff>>()
  const [loading, setLoading] = useState<boolean>(true)
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [filters, setFilters] = useState({})
  // const [countUsers, setCountUsers] = useState(0)

  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'staff'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission, actualLimit, actualPage])

  useEffect(() => {
    getData()
  }, [filters])

  const getData = async () => {
    setLoading(true)
    // const res = await verifyKeyUserFn()
    // if (res) {
    // setCountUsers(await countUserWorkerFn())
    const result = await listStaffFn(actualPage, actualLimit, filters)
    setPagination(result)
    setData(convertTotable(result.docs))
    // }
    setLoading(false)
  }

  const goToCreate = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Crear staffer">
        <Link href={{ pathname: '/[lang]/staff/create', query: { lang } }}>
          <a>
            <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
          </a>
        </Link>
      </Tooltip>
      <UploadExcel reload={getData} translations={localization.translations} />
    </div>
  )

  const onchange = (_: unknown, newFilters: FilterType) => {
    setFilters(formatFiltersTable(newFilters))
  }

  return (
    <>
      {/* <ModalKeyUser setOpen={setOpen} visible={open} getData={getData} /> */}
      <MainLayout getData={getData} create={goToCreate()} lang={lang} title={`${localization?.translations.titleSection}`}>
        <>
          <TableData<IStaff>
            columns={columns({
              after: getData,
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              lang,
              permision: permission
            })}
            scroll={{ x: 1500, y: '40vh' }}
            data={data}
            /* eslint-disable-next-line */
            //@ts-ignore
            onChange={onchange}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} staffers`,
              current: actualPage,
              onChange: newPage => {
                setActualPage(newPage)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, page: newPage }
                })
              },
              onShowSizeChange: (_, newLimit) => {
                setActualLimit(newLimit)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, limit: newLimit }
                })
              }
            }}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(staff)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = ctx?.req?.headers?.cookie
  try {
    if (token) {
      if (cookie?.parse(token)?.authRenapPanel) {
        setToken(cookie.parse(token).authRenapPanel)
        const localization = getLocalizationProps(ctx, 'staff')
        const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
        const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10

        // const groups = await listGro()
        const locations = await getAllLocationActive()
        const timeZone = await listTimeZonesFn()
        const apps = await getAllApps()
        return { props: { localization, page, limit, groups: [], locations, timeZone, apps } }
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
  } catch (error) {
    // console.log(error)
    return {
      notFound: true
    }
  }
}
