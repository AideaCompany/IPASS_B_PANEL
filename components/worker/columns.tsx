//types
import { deleteWorker } from '@/graphql/worker/mutation/deleteWorker'
import { updateWorker } from '@/graphql/worker/mutation/updateWorker'
import { Translations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps, IGroupWorker, ILocation, iTimeZone, IWorker, PermissionsPrivilege, Privilege, User } from '@/types/types'
import { UserOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import RenderCheck from '../RenderCheck'
import ResetToken from '../users/ResetToken'
import { formElements } from './formElements'
import FormItems from './formItem'
import QRWorker from './QRWorker'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  beforeShowUpdate?: (param: any) => any
  after: () => void
  locations: ILocation[]
  permision: Privilege
  groups: IGroupWorker[]
  timeZone: iTimeZone[]
  apps: IApps[]
}): ColumnType<IWorker>[] => {
  const { translations, actualPermission, locations, after, apps, beforeShowUpdate, groups, permision, timeZone } = props
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()

  const operations = (record: IWorker) => {
    return (
      <>
        <QRWorker reload={after} worker={record} translations={translations} />
        <UpdateItem
          beforeShowUpdate={beforeShowUpdate}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateWorker)}
          record={record}
          afterUpdate={after}
          FormItems={
            <FormItems
              apps={apps}
              permission={permision}
              locations={locations}
              isUpdate
              inicialData={record.photo}
              timeZone={timeZone}
              translations={translations}
              groups={groups}
            />
          }
          formElements={formElements(locations, groups, timeZone, apps, record.photo)}
        />
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(deleteWorker)}
          theme={theme}
          record={record}
        />
        {record.tokenExpo && permission.name === 'Super_admin' && <ResetToken record={record} type="worker" after={after} />}
      </>
    )
  }

  return ColumnFactory({
    columns: [
      {
        name: 'photo',
        fixed: 'left',
        width: 60,
        customRender: (record: User, index) => {
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar style={{ border: '1px solid #ff8623' }} src={<Image src={record.photo.key} />} />
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
        width: 150
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
        fixed: 'left',
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
        customRender: (record: IWorker) => record?.group?.map(e => e.abbreviation).join(', ')
      },
      {
        name: 'apps',
        width: 150,
        customRender: (record: IWorker) => record?.apps?.map(e => e.abbreviation).join(', ')
      },
      {
        name: 'nativeLocation',
        width: 150,
        customRender: (record: IWorker) => record?.nativeLocation?.map(e => e.abbreviation).join(', ')
      },
      {
        name: 'active',
        width: 80,
        customRender: (record: IWorker) => <RenderCheck value={record.active} />
      },
      {
        name: 'code',
        width: 80,
        customRender: (record: IWorker) => <RenderCheck value={record.code} />
      },
      {
        name: 'canAccessToApp',
        width: 80,
        customRender: (record: IWorker) => <RenderCheck value={record.canAccessToApp} />
      },
      {
        name: 'canAccessToWeb',
        width: 80,
        customRender: (record: IWorker) => <RenderCheck value={record.canAccessToWeb} />
      },
      {
        name: 'timeZone',
        width: 150,
        customRender: (record: IWorker) => record?.timeZone?.map(e => e.abbreviation).join(', ')
      },
      {
        name: 'canUseAuthenticator',
        width: 150,
        customRender: (record: IWorker) => <RenderCheck value={record.canUseAuthenticator} />
      }
    ],
    translate: translations,
    operations: operations,
    operationOptions: {
      fixed: 'right',
      width: 120
    },
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
