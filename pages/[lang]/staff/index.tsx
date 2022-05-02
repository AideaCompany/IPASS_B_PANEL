//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/staff/columns'
import { formElementsPersonal } from '@/components/staff/create/StepOne/formElementsPersonal'
import FormItemsPersonal from '@/components/staff/create/StepOne/formItemPersonal'

import UploadExcel from '@/components/staff/UploadExcel'
import TableData from '@/components/TableDatas'
import { setToken } from '@/graphql/config'
import { createStaff } from '@/graphql/Staff/mutation/createStaff'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllApps } from '@/services/apps'
import { getAllLocationActive } from '@/services/locations'
import { listStaffFn } from '@/services/staff'
import { getAllStores } from '@/services/stores'
import { listTimeZonesFn } from '@/services/timeZone'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { gql } from '@apollo/client'
import { Button, message, Tooltip } from 'antd'
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
  stores: IStores[]
}) => {
  //#region hooks
  const router = useRouter()
  //#endregion hooks

  //props
  const { localization, lang, page, limit, stores } = props
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

  const manageMentError = (error: string) => {
    if (error.includes('E11000 duplicate')) {
      message.error({ content: localization.translations.serialDuplicated, key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

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
    setData(
      convertTotable(result.docs).map(e => ({
        ...e,
        photo: e.photo ? { ...e.photo, key: `${process.env.NEXT_PUBLIC_S3 as string}/${e.photo.key}` } : e.photo
      }))
    )
    // }
    setLoading(false)
  }

  const before = (item: IStaff) => {
    // const newItem = JSON.parse(JSON.stringify(item))
    // newItem.security = item.security.map((e: any) => e?._id)
    // return newItem
    // if (item.photo) item.photo.key = `${process.env.NEXT_PUBLIC_S3}/${item.photo.key}`
    return item
  }
  const goToCreate = () => (
    <Tooltip title="Crear producto">
      <Link href={{ pathname: '/[lang]/staff/create', query: { lang } }}>
        <a>
          <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
        </a>
      </Link>
    </Tooltip>
  )

  const createButton = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <Tooltip title="Grupos de staffers">
        <Button
          style={{ margin: '5px' }}
          onClick={() => router.push({ pathname: '/[lang]/worker/groups', query: { lang: router.query.lang } })}
          shape={'circle'}
          icon={<Role />}
        />
      </Tooltip> */}
      <UploadExcel reload={getData} translations={localization.translations} />
      <CreateItem
        actualPermission={actualPermission as IPermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createStaff)}
        formElements={formElementsPersonal(stores)}
        afterCreate={getData}
        manageMentError={manageMentError}
        FormItem={<FormItemsPersonal stores={stores} isUpdate={true} permission={permission} translate={localization.translations} />}
        iconButton={true}
      />
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
              stores,
              after: getData,
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              beforeShowUpdate: before,
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
        const stores = await getAllStores()
        return { props: { localization, page, limit, groups: [], locations, timeZone, apps, stores } }
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
