//react
//Components
import columns from '@/components/board/columns'
import FormFactory from '@/components/crudFunctions/FormFactory'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { getAllBreach2Days } from '@/services/breach'
import { generaReportBreachFn, generaReportBreachPDFFn } from '@/services/report'
import { IBreach, Paginated, PermissionsPrivilege } from '@/types/types'
import { Button, Form, FormInstance } from 'antd'
import moment from 'moment-timezone'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'

interface actualItem extends IBreach {}

const board = (props: { localization: Localization; lang: string; page: number; limit: number }) => {
  //props
  const { localization, lang, page, limit } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const { theme } = useContext(ThemeContext)
  const [loading, setloading] = useState<boolean>(true)
  //#region cards
  const [filters, _] = useState<any>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [pagination, setPagination] = useState<Paginated<actualItem>>()
  //#endregion cards
  const router = useRouter()
  //providers
  const { permission } = useAuth()
  const formRef = useRef<FormInstance>(null)
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Board'))
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
    const values = await formRef.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    const result = await getAllBreach2Days(actualPage, actualLimit, {
      filters: [...filters],
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
    setPagination(result)
    setData(result.docs)
    setloading(false)
  }

  const generateExcel = async () => {
    const values = await formRef.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    setloading(true)
    const res = await generaReportBreachFn(actualPage, actualLimit, {
      filters: [...filters],
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
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setloading(false)
  }

  const generatePdf = async () => {
    const values = await formRef.current?.validateFields()
    const timeValues = { start: values.start, end: values.end }
    delete values.start
    delete values.end
    setloading(true)
    const res = await generaReportBreachPDFFn(actualPage, actualLimit, {
      filters: [...filters],
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
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setloading(false)
  }

  return (
    <>
      <MainLayout hideButtons={true} getData={getData} lang={lang} title={localization?.translations.titleSection} notShowHeader={true}>
        <>
          <div className="filters">
            <Form
              ref={formRef}
              initialValues={{
                from: moment.tz('America/Guatemala'),
                to: moment.tz('America/Guatemala')
              }}
              onFinish={getData}
            >
              <div className="top">
                <FormFactory
                  isUpdate={false}
                  theme={theme}
                  translate={localization.translations}
                  formElements={[
                    { name: 'start', type: 'dateNoTime', fullWidth: true },
                    { name: 'end', type: 'dateNoTime', fullWidth: true }
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
              actualPermission: actualPermission as PermissionsPrivilege,
              permision: permission,
              lang: lang,
              after: getData
            })}
            loading={loading}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} registros`,
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
            data={data}
            scroll={{ y: '40vh' }}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(board)
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'board')
  const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
  const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
  return { props: { localization, page, limit } }
}
