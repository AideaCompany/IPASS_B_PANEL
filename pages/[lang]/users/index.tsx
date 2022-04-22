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

//apollo
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
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { FilterType, IPaginated } from '@/types/interfaces/graphqlTypes'
const user = (props: {
  localization: Localization
  lang: string
  page: number
  limit: number
  locations: ILocation[]
  timeZone: ITimeZone[]
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
  const [data, setData] = useState<IUser[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()

  const [filters, setFilters] = useState<FilterType>([])
  const [actualLimit, setActualLimit] = useState<number>(limit)
  const [actualPage, setActualPage] = useState<number>(page)
  const [pagination, setPagination] = useState<IPaginated<IUser>>()
  const [open, setOpen] = useState(false)
  const [countUsers, setCountUsers] = useState(0)

  //Effect
  useEffect(() => {
    if (permission) {
      setLoading(true)
      // setPermissionPermission(permission.permissions?.find(e => e.sectionName === 'Permission'))
      setActualPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'users'))
    }
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
            photo: e.photo ? { ...e.photo, key: `${process.env.NEXT_PUBLIC_S3 as string}/${e.photo.key}` } : e.photo
          }))
          .reverse()
      )
    }
    setLoading(false)
  }

  const beforeCreate = (item: IUser) => {
    const newUser = item
    newUser.lang = lang
    return newUser
  }

  const createButton = (
    <div className="ButtonsUp">
      <CreateItem
        actualPermission={actualPermission as IPermissionsPrivilege}
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

  const onchange = (_: unknown, currentFilters: FilterType) => {
    setFilters(formatFiltersTable(currentFilters))
  }

  const beforeShowUpdate = (render: IUser) => {
    // render.group = (render?.group as IGroupWorker[])?.map(e => e._id)
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
              actualPermission: actualPermission as IPermissionsPrivilege,
              after: getData,
              privileges: privilege,
              beforeShowUpdate: beforeShowUpdate,
              groups,
              locations,
              timeZone
            })}
            data={data}
            loading={loading}
            /* eslint-disable-next-line */
            // @ts-ignore
            onChange={onchange}
            scroll={{ x: 1500, y: '60vh' }}
            pagination={{
              pageSize: actualLimit,
              size: 'default',
              total: pagination?.totalDocs,
              showTotal: (total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} Usuario`,
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
          />
        </div>
      </MainLayout>
    </>
  )
}

export default React.memo(user)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = ctx?.req?.headers?.cookie
  if (token) {
    if (cookie.parse(token).authRenapPanel) {
      setToken(cookie.parse(token).authRenapPanel)
      const localization = getLocalizationProps(ctx, 'user')
      const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
      const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
      // const queriesNames = Object.keys(ctx.query).filter((e: string) => e !== 'page' && e !== 'limit' && e !== 'lang')
      // const filters = queriesNames.length > 0 && queriesNames.map(e => ({ [e]: ctx.query[e] as string }))
      const locations = await getAllLocationActive()
      const timeZone = await listTimeZonesFn()
      // const groups = await listGroupWorkerIfExistFn()
      const apps = await getAllApps()
      return { props: { localization, page, limit, locations, timeZone, groups: [], apps } }
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
