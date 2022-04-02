import { deleteUser } from '@/graphql/user/mutation/deleteUser'
import { updateUser } from '@/graphql/user/mutation/updateUser'
//types
import { ITranslations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { fileType } from '@/types/typeTemplate'
import { CheckCircleFilled, CloseCircleFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import RenderCheck from '../RenderCheck'
import { formElements } from './formElements'
import FormItems from './formItems'
import ResetToken from './ResetToken'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  beforeShowUpdate?: (param: IUser) => void
  privileges: IPrivilege[]
  after: () => void
  groups: IGroupWorker[]
  locations: ILocation[]
  timeZone: ITimeZone[]
  apps: IApps[]
  // filters: any[]
}): ColumnType<IUser>[] => {
  const { translations, actualPermission, apps, after, privileges, beforeShowUpdate, groups, locations, timeZone } = props
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()
  // const actualFilters = filters.reduce((a, b) => ({ ...a, ...b }))

  const operations = (record: IUser) => (
    <>
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateUser)}
        record={record}
        afterUpdate={after}
        FormItems={
          <FormItems
            apps={apps}
            permission={permission}
            privileges={privileges}
            group={groups}
            timeZone={timeZone}
            locations={locations}
            translations={translations}
            isUpdate
            inicialData={record.photo as fileType}
          />
        }
        formElements={formElements(privileges, apps, locations, timeZone)}
      />
      <DeleteItem
        actualPermission={actualPermission}
        afterDelete={after}
        translations={translations}
        mutation={gql(deleteUser)}
        theme={theme}
        record={record}
      />
      {record.tokenExpo && permission.name === 'Super_admin' && <ResetToken record={record} type="user" after={after} />}
    </>
  )
  return ColumnFactory({
    columns: [
      {
        name: 'photo',
        fixed: 'left',
        width: 60,
        customRender: (record: IUser) => {
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar style={{ border: '1px solid #ff8623', overflow: 'hidden' }} src={<Image preview={true} src={record.photo.key} />} />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      },

      {
        name: 'name',
        search: true,
        fixed: 'left',
        width: 200
      },
      {
        name: 'lastname',
        search: true,
        fixed: 'left',
        width: 150
      },
      {
        name: 'codeWorker',
        search: true,
        width: 200
      },
      {
        name: 'name1',
        search: true,
        width: 150
      },
      {
        name: 'name2',
        search: true,
        width: 150
      },
      {
        name: 'lastname1',
        search: true,
        width: 150
      },
      {
        name: 'lastname2',
        search: true,
        width: 150
      },
      {
        name: 'email',
        search: true,
        width: 250
      },
      {
        name: 'typeDocument',
        search: true,
        width: 150
      },
      {
        name: 'document',
        search: true,
        width: 150
      },
      {
        name: 'phone',
        search: true,
        width: 150
      },
      {
        name: 'group',
        width: 150,
        customRender: (record: IUser) => (record.group as IGroupWorker[])?.map(e => e.abbreviation).join(', ')
      },
      {
        name: 'nativeLocation',
        width: 150,
        customRender: (record: IUser) => (record.nativeLocation as ILocation[])?.map(e => e.name).join(', ')
      },
      {
        name: 'active',
        width: 80,
        customRender: (record: IUser) => <RenderCheck value={record.active} />
      },
      {
        name: 'canAccessToApp',
        width: 180,
        customRender: (record: IUser) => <RenderCheck value={record.canAccessToApp} />
      },
      {
        name: 'canAccessToWeb',
        width: 180,
        customRender: (record: IUser) => <RenderCheck value={record.canAccessToWeb} />
      },
      {
        name: 'timeZone',
        width: 150,
        customRender: (record: IUser) => (record?.timeZone as ITimeZone[])?.map(e => e?.abbreviation)?.join(', ')
      },
      {
        name: 'apps',
        width: 150,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        customRender: (record: IUser) => record?.apps?.map((e: IApps) => e?.abbreviation)?.join(', ')
      },
      {
        name: 'canUseAuthenticator',
        width: 150,
        customRender: (record: IUser) => <RenderCheck value={record?.canUseAuthenticator} />
      },
      {
        name: 'active',
        customRender: (render: IUser) => (
          <>
            {render.active ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CheckCircleFilled style={{ color: 'rgba(35, 203, 167, 1)' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CloseCircleFilled style={{ color: 'rgba(207, 0, 15,1)' }} />
              </div>
            )}
          </>
        ),
        width: 150
      },

      {
        name: 'privilegeID',
        customRender: (render: IUser) => (render.privilegeID as IPrivilege).name,
        customFilter: '_id',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        filter: privileges.map((privilege: IPrivilege) => ({ text: privilege.name, value: privilege._id })),
        width: 150,
        fixed: 'right'
      }
    ],
    translate: translations,
    operations: operations,
    operationOptions: {
      fixed: 'right',
      width: 120
    },
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
