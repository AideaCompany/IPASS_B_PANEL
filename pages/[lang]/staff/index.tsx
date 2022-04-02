//react
//Components
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import ModalKeyUser from '@/components/users/ModalKeyUser'
import columns from '@/components/staff/columns'
import { formElements } from '@/components/staff/formElements'
import FormItems from '@/components/staff/formItem'
import UploadExcel from '@/components/staff/UploadExcel'

//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllLocationActive } from '@/services/locations'
import { listTimeZonesFn } from '@/services/timeZone'
import { countUserWorkerFn, verifyKeyUserFn } from '@/services/users'

import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { gql } from '@apollo/client'
import { Button, message, Tooltip } from 'antd'
import { Role } from 'icons/personalIcons'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as cookie from 'cookie'
import { setToken } from '@/graphql/config'
import { getAllApps } from '@/services/apps'
import { FileUnknownOutlined } from '@ant-design/icons'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
import { listStaffFn } from '@/services/staff'
import { createStaff } from '@/graphql/Staff/mutation/createStaff'

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
  const { localization, lang, page, limit, apps, groups, locations, timeZone } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [pagination, setPagination] = useState<IPaginated<IStaff>>()
  const [loading, setLoading] = useState<boolean>(true)
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [filters, setFilters] = useState({})
  const [open, setOpen] = useState(false)
  const [countUsers, setCountUsers] = useState(0)

  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'worker'))
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
    const res = await verifyKeyUserFn()
    if (!res) {
      setOpen(true)
    } else {
      setCountUsers(await countUserWorkerFn())
      const result = await listStaffFn(actualPage, actualLimit, filters)
      setPagination(result)
      setData(
        convertTotable(result.docs).map(e => ({
          ...e,
          photo: e.photo ? { ...e.photo, key: `${process.env.NEXT_PUBLIC_S3 as string}/${e.photo.key}` } : e.photo
        }))
      )
    }
    setLoading(false)
  }

  const before = (item: IStaff) => {
    // const newItem = JSON.parse(JSON.stringify(item))
    // newItem.security = item.security.map((e: any) => e?._id)
    // return newItem
    // if (item.photo) item.photo.key = `${process.env.NEXT_PUBLIC_S3}/${item.photo.key}`
    return item
  }

  const createButton = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Descargar plantilla">
        <Button
          style={{ margin: '5px' }}
          onClick={() => router.push({ pathname: 'https://renapbackend.ipass.com.gt/plantilla', query: { lang: router.query.lang } })}
          shape={'circle'}
          icon={<FileUnknownOutlined />}
        />
      </Tooltip>
      <Tooltip title="Grupos de trabajadores">
        <Button
          style={{ margin: '5px' }}
          onClick={() => router.push({ pathname: '/[lang]/worker/groups', query: { lang: router.query.lang } })}
          shape={'circle'}
          icon={<Role />}
        />
      </Tooltip>
      <UploadExcel
        apps={props.apps}
        timeZone={timeZone}
        groups={groups}
        locations={locations}
        reload={getData}
        translations={localization.translations}
      />
      <CreateItem
        actualPermission={actualPermission as IPermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createStaff)}
        formElements={formElements(locations, groups, timeZone, apps)}
        afterCreate={getData}
        manageMentError={manageMentError}
        FormItem={
          <FormItems
            apps={apps}
            timeZone={timeZone}
            groups={groups}
            permission={permission}
            locations={locations}
            translations={localization.translations}
          />
        }
        iconButton={true}
      />
    </div>
  )

  const onchange = (_: unknown, newFilters: FilterType) => {
    setFilters(formatFiltersTable(newFilters))
  }
  return (
    <>
      <ModalKeyUser setOpen={setOpen} visible={open} getData={getData} />
      <MainLayout
        getData={getData}
        create={createButton}
        lang={lang}
        title={`${localization?.translations.titleSection} - ${countUsers - 1}/1500 usuarios y trabajadores`}
      >
        <>
          <TableData<IStaff>
            columns={columns({
              apps,
              after: getData,
              timeZone: timeZone,
              locations: locations,
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              beforeShowUpdate: before,
              permision: permission,
              groups
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
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} trabajadores`,
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
