//react
//Components
import FormFactory from '@/components/crudFunctions/FormFactory'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/reports/columns'
import columnsHis from '@/components/reports/history/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { getAllEventsHistory, getAllHistoryUser } from '@/services/history'
import { getAllLocationEntries, listLocationEntriesPaginatedFn } from '@/services/locationEntries'
import { getAllLocationActive } from '@/services/locations'
import { getAllMasterLocation } from '@/services/masterLocations'
import { generateReport, generateReportPDF } from '@/services/report'
import { getAllHostUsers, listAllUsersFn } from '@/services/users'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { getDpi, getHost, getLastName, getName, getType } from '@/utils/report'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { Button, Form, FormInstance } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
// other
import moment from 'moment-timezone'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'

type actualItem = ILocationEntries

const visitorCategory = (props: { localization: Localization; lang: string; page: number; limit: number }) => {
  //props
  const { localization, lang, page, limit } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  //#region tables init data
  const [dataHis, setDataHis] = useState<actualItem[]>([])
  //#endregion tables init data

  //#region filtered tables data
  const [filteredDataHist, setFilteredDataHist] = useState<actualItem[]>([])
  const [filteredLocEntr, setfilteredLocEntr] = useState<actualItem[]>([])
  const [filters, setFilters] = useState<FilterType[]>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [pagination, setPagination] = useState<IPaginated<actualItem>>()
  //#endregion filtered tables data

  //#region filters locEntr data
  const [locations, setLocations] = useState<ILocation[]>([])
  const [hosts, sethosts] = useState<IUser[]>([])
  const [users, setusers] = useState<IUser[]>([])
  //#endregion filters locEntr data

  const [loading, setloading] = useState<boolean>(true)
  const { theme } = useContext(ThemeContext)
  //providers
  const { permission } = useAuth()

  //#region refs
  const formHistory = useRef<FormInstance>(null)
  const formLocEntr = useRef<FormInstance>(null)

  //#endregion
  const router = useRouter()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Reports'))
  }, [permission])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi , @typescript-eslint/no-extra-semi
    ;(async () => {
      if (actualPermission) {
        getData()
        sethosts(await getAllHostUsers())
        setusers(await listAllUsersFn())
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    const tempLocation = await getAllLocationActive()
    setLocations(tempLocation)
    const currentLocations = tempLocation.map(location => ({ ...location, type: 'Locación' }))
    const events = (await getAllEventsHistory()).map(event => ({ ...event, type: 'Evento' }))
    const currentUsers = (await getAllHistoryUser()).map(user => ({ ...user, type: 'Usuario' }))
    const masterLocations = (await getAllMasterLocation()).map(masterLoc => ({ ...masterLoc, type: 'Locación Maestra' }))
    const result = [...events, ...currentLocations, ...currentUsers, ...masterLocations]
    //#region datahis
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setDataHis(result)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setFilteredDataHist(result)
    //#endregion datahis

    //#region dataEntries
    getLocationEntries()
    //#endregion dataEntries
    setloading(false)
  }

  const getLocationEntries = async () => {
    setloading(true)
    const values = await formLocEntr.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    const result = await listLocationEntriesPaginatedFn(actualPage, actualLimit, {
      /* eslint-disable */
      //@ts-ignore
      filters: [...filters],
      //@ts-ignore
      selected: [
        ...Object.keys(values)
          .filter(e => values[e])
          .map(e => ({ [e]: values[e] }))
      ],
      ...{
        start: moment.tz(timeValues.start, 'America/Guatemala').format(),
        end: moment.tz(timeValues.end, 'America/Guatemala').format(),
        apps: values.apps
      }
    })

    setPagination(result)
    setfilteredLocEntr(
      //@ts-ignore
      convertTotable(
        result.docs.map(e => ({
          ...e,
          type: getType(e.typeQr),
          date: e.createdAt,
          host: getHost(e),
          name: getName(e),
          lastName: getLastName(e),
          in: e.hourIn,
          out: e.hourOut,
          location: e.location,
          document: getDpi(e)
        }))
      )
    )
    /* eslint-enable */
    setloading(false)
  }

  const getFilteredLocEntr = async (filter: FilterType) => {
    setloading(true)
    const resultLoc = await getAllLocationEntries(filter)
    setfilteredLocEntr(resultLoc)
    setloading(false)
  }

  const getFilteredHistory = (filter: FilterType) => {
    setloading(true)
    /* eslint-disable */
    //@ts-ignore
    let filtered = dataHis
    //@ts-ignore
    if (filter.start !== null && filter.end !== null) {
      //@ts-ignore
      filtered = filtered.filter((item: any) => moment(item.updatedAt).isBetween(filter.start, filter.end, 'days', '[]'))
    }
    //@ts-ignore
    if (filter.users !== null) {
      //@ts-ignore
      filtered = filtered.filter((item: any) => {
        //@ts-ignore
        if (!filter.users) {
          return true
        } else {
          //@ts-ignore
          return !item.whoDeleted ? false : item.whoDeleted._id == filter?.users
        }
      })
    }
    setFilteredDataHist(filtered as any)

    setloading(false)
  }

  const generateExcel = async () => {
    const values = await formLocEntr.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    setloading(true)
    const res = await generateReport(actualPage, actualLimit, {
      //@ts-ignore
      filters: [...filters],
      //@ts-ignore
      selected: [
        ...Object.keys(values)
          .filter(e => values[e])
          .map(e => ({ [e]: values[e] }))
      ],
      ...{
        start: moment.tz(timeValues.start, 'America/Guatemala').startOf('day').format(),
        end: moment.tz(timeValues.end, 'America/Guatemala').endOf('day').format(),
        apps: values.apps
      }
    })
    const a = document.createElement('a')
    a.style.display = 'none'

    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES as string}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setloading(false)
  }
  const onchange = (_: unknown, newFilters: FilterType) => {
    setFilters(formatFiltersTable(newFilters))
  }
  useEffect(() => {
    getLocationEntries()
  }, [filters])

  const generatePdf = async () => {
    const values = await formLocEntr.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    setloading(true)
    const res = await generateReportPDF(actualPage, actualLimit, {
      //@ts-ignore
      filters: [...filters],
      //@ts-ignore
      selected: [
        ...Object.keys(values)
          .filter(e => values[e])
          .map(e => ({ [e]: values[e] }))
      ],
      ...{
        start: moment.tz(timeValues.start, 'America/Guatemala').startOf('day').format(),
        end: moment.tz(timeValues.end, 'America/Guatemala').endOf('day').format(),
        apps: values.apps
      }
    })
    /* eslint-enable */
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES as string}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setloading(false)
  }

  return (
    <>
      <MainLayout notShowHeader={true} getData={getData} create={<></>} lang={lang} title={localization?.translations.titleSection}>
        <>
          <div className="filters">
            <Form
              ref={formLocEntr}
              initialValues={{
                start: moment.tz('America/Guatemala').startOf('day'),
                end: moment.tz('America/Guatemala').endOf('day')
              }}
              onFinish={getFilteredLocEntr}
            >
              <div className="top">
                <FormFactory
                  isUpdate={true}
                  theme={theme}
                  translate={localization.translations}
                  formElements={[
                    { name: 'start', type: 'date', fullWidth: true },
                    { name: 'end', type: 'date', fullWidth: true },
                    {
                      name: 'location',
                      type: 'select',
                      data: locations,
                      fullWidth: true
                    },
                    {
                      name: 'host',
                      type: 'select',
                      data: hosts,
                      fullWidth: true
                    }
                  ]}
                />
              </div>
            </Form>
            <div className="buttons">
              <Button shape="round" style={{ marginRight: '15px' }} onClick={getData}>
                Buscar
              </Button>
              <Button shape="round" style={{ marginRight: '15px' }} onClick={generateExcel}>
                Generar excel
              </Button>
              <Button shape="round" style={{ marginRight: '15px' }} onClick={generatePdf}>
                Generar PDF
              </Button>
            </div>
          </div>
          <TableData
            columns={columns({
              translations: localization.translations,
              permision: permission,
              lang: lang
            })}
            /* eslint-disable */
            //@ts-ignore
            onChange={onchange}
            /* eslint-enable */
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} registros`,
              current: actualPage,
              onChange: newPage => {
                setActualPage(newPage)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, newPage }
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
            data={filteredLocEntr}
            loading={loading}
          />

          <h2 className="history__title">{localization?.translations.titleSection2}</h2>
          <div className="filters">
            <Form ref={formHistory} onFinish={getFilteredHistory}>
              <div className="top">
                <FormFactory
                  isUpdate={true}
                  theme={theme}
                  translate={localization.translations}
                  formElements={[
                    { name: 'start', type: 'dateNoTime' },
                    { name: 'end', type: 'dateNoTime' },
                    {
                      name: 'users',
                      type: 'select',
                      data: users.map((user: IUser) => {
                        user.name = user.email
                        return user
                      })
                    }
                  ]}
                />
              </div>

              <div className="end">
                <Button style={{ marginRight: 8 }} shape="round" onClick={() => setFilteredDataHist(dataHis)}>
                  {localization.translations.reset}
                </Button>
                <FormItem>
                  <Button shape="round" type="primary" htmlType="submit">
                    {localization.translations.search}
                  </Button>
                </FormItem>
              </div>
            </Form>
          </div>

          <TableData
            //@ts-ignore
            columns={columnsHis({
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              permision: permission,
              lang: lang
            })}
            data={filteredDataHist}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const localization = getLocalizationProps(ctx, 'reports')
  const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
  const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
  return { props: { localization, page, limit } }
}
