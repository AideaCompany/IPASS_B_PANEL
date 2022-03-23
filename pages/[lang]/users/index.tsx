import CreateItem from '@/components/crudFunctions/create'
//components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
import columns from '@/components/users/columns'
import { formElements } from '@/components/users/formElements'
import FormItems from '@/components/users/formItems'
import ModalKeyUser from '@/components/users/ModalKeyUser'
import { createUser } from '@/graphql/user/mutation/createUser'
//Lenguage
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import useData from '@/providers/DataContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllLocationActive } from '@/services/locations'
import { listTimeZonesFn } from '@/services/timeZone'
import { countUserWorkerFn, getAllUsers, verifyKeyUserFn } from '@/services/users'
import { listGroupWorkerIfExistFn } from '@/services/workers'
//apollo
import { IApps, IGroupWorker, ILocation, iTimeZone, Paginated, PermissionsPrivilege, User } from '@/types/types'
import { convertTotable, formatFiltersTable } from '@/utils/utils'
import { gql } from '@apollo/client'
import { setToken } from '@/graphql/config'
//antd
import { Button, Tooltip } from 'antd'
import { Role } from 'icons/personalIcons'
//next
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as cookie from 'cookie'
import { getAllApps } from '@/services/apps'
const user = (props: {
  localization: Localization
  lang: string
  page: number
  limit: number
  locations: ILocation[]
  timeZone: iTimeZone[]
  groups: IGroupWorker[]
  apps: IApps[]
}): JSX.Element => {
  //props
  const { localization, lang, apps, page, limit, locations, timeZone, groups } = props
  //context
  const { privilege } = useData()
  const { permission } = useAuth()
  const router = useRouter()
  //state
  const [data, setData] = useState<User[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [_, setPermissionPermission] = useState<PermissionsPrivilege>()
  const [filters, setFilters] = useState<any>([])
  const [actualLimit, setActualLimit] = useState(limit)
  const [actualPage, setActualPage] = useState(page)
  const [pagination, setPagination] = useState<Paginated<User>>()
  const [open, setOpen] = useState(false)
  const [countUsers, setCountUsers] = useState(0)

  //Effect
  useEffect(() => {
    ;(async () => {
      if (permission) {
        setLoading(true)
        setPermissionPermission(permission.permissions?.find(e => e.sectionName === 'Permission'))
        setActualPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'users'))
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
    const res = await verifyKeyUserFn()
    if (!res) {
      setOpen(true)
    } else {
      setCountUsers(await countUserWorkerFn())
      const result = await getAllUsers(actualPage, actualLimit, filters)
      setPagination(result)
      setData(
        convertTotable(result.docs)
          .map(e => ({
            ...e,
            photo: e.photo ? { ...e.photo, key: `${process.env.NEXT_PUBLIC_S3}/${e.photo.key}` } : e.photo
          }))
          .reverse()
      )
    }
    setLoading(false)
  }

  const beforeCreate = (item: User) => {
    console.log(item)
    const newUser = item
    newUser.lang = lang
    return newUser
  }

  const createButton = (
    <div className="ButtonsUp">
      <CreateItem
        actualPermission={actualPermission as PermissionsPrivilege}
        translations={localization.translations}
        mutation={gql(createUser)}
        formElements={formElements(privilege, apps, locations, timeZone)}
        afterCreate={getData}
        beforeCreate={beforeCreate}
        iconButton={true}
        FormItem={
          <FormItems
            apps={apps}
            group={groups}
            isUpdate={true}
            locations={locations}
            timeZone={timeZone}
            privileges={privilege}
            permission={permission}
            translations={localization.translations}
          />
        }
      />
      {true && (
        <Tooltip title={localization.translations.buttonPrivilege}>
          <Button
            style={{ margin: '5px' }}
            onClick={() => router.push({ pathname: '/[lang]/permission', query: { lang: router.query.lang } })}
            shape="circle"
            icon={<Role />}
          />
        </Tooltip>
      )}
    </div>
  )

  const onchange = (_: any, filters: any, sorter: any) => {
    setFilters(formatFiltersTable(filters))
  }

  const beforeShowUpdate = (render: User) => {
    render.group = (render?.group as IGroupWorker[])?.map(e => e._id)
    // render.timeZone = (render?.timeZone as iTimeZone[])?.map(e => e._id)
    // render.nativeLocation = (render?.nativeLocation as ILocation)?._id
    return render
  }

  return (
    <>
      <ModalKeyUser getData={getData} visible={open} setOpen={setOpen} />
      <MainLayout
        getData={getData}
        create={createButton}
        lang={lang}
        title={`${localization?.translations.titleSection} - ${countUsers - 1}/1500 usuarios`}
      >
        <div>
          <TableData
            columns={columns({
              apps,
              translations: localization.translations,
              actualPermission: actualPermission as PermissionsPrivilege,
              after: getData,
              privileges: privilege,
              beforeShowUpdate: beforeShowUpdate,
              groups,
              locations,
              timeZone
            })}
            data={data}
            loading={loading}
            onChange={onchange}
            scroll={{ x: 1500, y: '60vh' }}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} Usuario`,
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

export default React.memo(user)

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const token = ctx?.req?.headers?.cookie
  if (token) {
    if (cookie.parse(token as string).authRenapPanel) {
      setToken(cookie.parse(token as string).authRenapPanel)
      const localization = getLocalizationProps(ctx, 'user')
      const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
      const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
      // const queriesNames = Object.keys(ctx.query).filter((e: string) => e !== 'page' && e !== 'limit' && e !== 'lang')
      // const filters = queriesNames.length > 0 && queriesNames.map(e => ({ [e]: ctx.query[e] as string }))
      const locations = await getAllLocationActive()
      const timeZone = await listTimeZonesFn()
      const groups = await listGroupWorkerIfExistFn()
      const apps = await getAllApps()
      return { props: { localization, page, limit, locations, timeZone, groups, apps } }
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
