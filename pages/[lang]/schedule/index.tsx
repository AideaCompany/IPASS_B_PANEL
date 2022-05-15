//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/schedule/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { listServiceScheduleFn } from '@/services/schedule'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IServiceSchedule } from '@/types/interfaces/ServiceSchedule/serviceSchedule.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { formatFiltersTable } from '@/utils/utils'
import { DatePicker, Form } from 'antd'
import moment, { Moment } from 'moment-timezone'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type actualItem = IServiceSchedule
const visitorCategory = (props: { localization: Localization; lang: string; page: number; limit: number }) => {
  //props
  const { localization, lang, page, limit } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [actualLimit, setActualLimit] = useState<number>(limit)
  const [actualPage, setActualPage] = useState<number>(page)
  const [filters, setFilters] = useState<FilterType>([])
  const [pagination, setPagination] = useState<IPaginated<IServiceSchedule>>()
  const [day, setDay] = useState(moment.tz('America/Guatemala'))
  //providers
  const { permission } = useAuth()
  const router = useRouter()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'schedule'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  useEffect(() => {
    getData()
  }, [filters, day])

  const getData = async () => {
    setLoading(true)
    const pagination = await listServiceScheduleFn(page, limit, { ...filters, day: [day] as any })
    setPagination(pagination)
    const values = pagination.docs.map(e => ({
      ...e,
      key: e._id,
      client: `${(e.client as IClient)?.name1} ${(e.client as IClient)?.lastName1}`,
      staffer: (e.staffer as IStaff)?.name as string,
      service: (e.service as IService)?.name as string
    }))
    setData(values)
    setLoading(false)
  }

  const onChange = (_: unknown, currentFilters: FilterType) => {
    setFilters(currentFilters)
  }

  const filtersForm = (): JSX.Element => {
    return (
      <div>
        <DatePicker value={day} onChange={value => setDay(value as Moment)} />
      </div>
    )
  }

  return (
    <>
      <MainLayout create={filtersForm()} getData={getData} lang={lang} title={localization?.translations.titleSection}>
        <TableData<IServiceSchedule>
          columns={columns({
            after: getData,
            translations: localization.translations,
            actualPermission: actualPermission as IPermissionsPrivilege,
            permision: permission,
            lang: lang
          })}
          /* eslint-disable-next-line */
          // @ts-ignore
          onChange={onChange}
          pagination={{
            pageSize: actualLimit,
            size: 'default',
            total: pagination?.totalDocs,
            showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} `,
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
                query: { ...router.query, newLimit }
              })
            }
          }}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'schedule')
  const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
  const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
  return { props: { localization, page, limit } }
}
