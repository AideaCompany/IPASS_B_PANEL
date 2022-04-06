//react
//Components
import columns from '@/components/authenticator/columns'
import FormFactory from '@/components/crudFunctions/FormFactory'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllApps } from '@/services/apps'
import { generateExcelAuthenticatorFn, generatePDFAuthenticatorFn, getAllAuthenticator } from '@/services/authenticator'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IAuthenticator } from '@/types/interfaces/Authenticator/Authenticator.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { Button, Form, FormInstance } from 'antd'
import moment from 'moment-timezone'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
type actualItem = IAuthenticator
const visitorCategory = (props: { localization: Localization; lang: string; apps: IApps[]; page: number; limit: number }) => {
  //props
  const { localization, lang, apps, page, limit } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [pagination, setPagination] = useState<IPaginated<IAuthenticator>>()
  const formRef = useRef<FormInstance>(null)
  const [filters, setFilters] = useState<FilterType[]>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  //providers
  const { permission } = useAuth()
  const router = useRouter()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Authenticator'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    const values = await formRef.current?.validateFields()
    const result = await getAllAuthenticator(actualPage, actualLimit, {
      /*eslint-disable*/
      //@ts-ignore
      filters,
      ...{
        start: moment.tz(values.from, 'America/Guatemala').startOf('day').format(),
        end: moment.tz(values.to, 'America/Guatemala').endOf('day').format(),
        apps: values.apps
      }
    })
    setPagination(result)
    setData(
      //@ts-ignore
      convertTotable(
        //@ts-ignore
        result.docs.map(e => {
          const valUser = e?.user ? e?.user : e.Worker
          return {
            ...e,
            name: valUser?.name,
            lastname: valUser?.lastname,
            email: valUser?.email,
            typeDocument: valUser?.typeDocument,
            document: valUser?.document
          }
        })
      )
    )
    /*eslint-enable*/
    setloading(false)
  }
  const onchange = (_: unknown, currentFilters: FilterType) => {
    setFilters(formatFiltersTable(currentFilters))
  }
  useEffect(() => {
    getData()
  }, [filters])

  const generateExcel = async () => {
    setloading(true)
    const values = await formRef.current?.validateFields()
    const res = await generateExcelAuthenticatorFn({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      filters,
      ...{
        start: moment.tz(values.from, 'America/Guatemala').startOf('day').format(),
        end: moment.tz(values.to, 'America/Guatemala').endOf('day').format(),
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

  const generatePdf = async () => {
    setloading(true)
    const values = await formRef.current?.validateFields()
    const res = await generatePDFAuthenticatorFn({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      filters,
      ...{
        start: moment.tz(values.from, 'America/Guatemala').startOf('day').format(),
        end: moment.tz(values.to, 'America/Guatemala').endOf('day').format(),
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

  return (
    <>
      <MainLayout notShowHeader getData={getData} lang={lang} title={localization?.translations.titleSection} hideButtons={true}>
        <>
          <div className="filtersContainer">
            <Form
              ref={formRef}
              initialValues={{
                from: moment.tz('America/Guatemala'),
                to: moment.tz('America/Guatemala')
              }}
            >
              <div className="top">
                <FormFactory
                  formElements={[
                    {
                      type: 'select',
                      name: 'apps',
                      data: apps
                    },
                    {
                      type: 'dateNoTime',
                      name: 'from',
                      required: true
                    },
                    {
                      type: 'dateNoTime',
                      name: 'to',
                      required: true
                    }
                  ]}
                  translate={localization?.translations}
                  isUpdate={true}
                  theme={''}
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
              actualPermission: actualPermission as IPermissionsPrivilege,
              permision: permission,
              lang: lang
            })}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onChange={onchange}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} registros`,
              current: actualPage,
              onChange: currentPage => {
                setActualPage(currentPage)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, page: currentPage }
                })
              },
              onShowSizeChange: (_, currentLimit) => {
                setActualLimit(currentLimit)
                router.replace({
                  pathname: router.pathname,
                  query: { ...router.query, limit: currentLimit }
                })
              }
            }}
            data={data}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const localization = getLocalizationProps(ctx, 'authenticator')
  const apps = await getAllApps()
  const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
  const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
  return { props: { localization, apps, page, limit } }
}
