//types

import { deleteStaff } from '@/graphql/Staff/mutation/deleteStaff'
import { updateStaff } from '@/graphql/Staff/mutation/updateStaff'
import { ITranslations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
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
import { formElementsPersonal } from './create/StepOne/formElementsPersonal'
import FormItemsPersonal from './create/StepOne/formItemPersonal'

import QRWorker from './QRWorker'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  beforeShowUpdate?: (param: IStaff) => IStaff
  after: () => void
  stores: IStores[]
  permision: IPrivilege
}): ColumnType<IStaff>[] => {
  const { translations, actualPermission, after, beforeShowUpdate, stores, permision } = props
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()

  const operations = (record: IStaff) => {
    return (
      <>
        <QRWorker reload={after} staff={record} translations={translations} />
        <UpdateItem
          beforeShowUpdate={beforeShowUpdate}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateStaff)}
          record={record}
          afterUpdate={after}
          FormItems={<FormItemsPersonal stores={stores} permission={permision} isUpdate inicialData={record.photo} translate={translations} />}
          formElements={formElementsPersonal(stores, record.photo)}
        />
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(deleteStaff)}
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
        customRender: (record: IStaff) => {
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
        name: 'lastName',
        search: true,
        fixed: 'left',
        width: 150
      },
      {
        name: 'email',
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
        name: 'lastName1',
        search: true,
        width: 150
      },
      {
        name: 'lastName2',
        search: true,
        width: 150
      },
      {
        name: 'address',
        search: true,
        width: 150
      },
      {
        name: 'stores',
        search: true,
        //@ts-ignore
        customRender: (record: unknown[]) => {
          return (record as IStores[])?.map(e => e.name).join(', ') as string
        },
        width: 150
      },
      {
        name: 'phone',
        search: true,
        width: 150
      },
      {
        name: 'phone1',
        search: true,
        width: 150
      },
      {
        name: 'specialty',
        search: true,
        width: 150
      },
      {
        name: 'AET',
        search: true,
        width: 150
      },

      // {
      //   name: 'group',
      //   width: 150,
      //   customRender: (record: IStaff) => record?.group?.map(e => e.abbreviation).join(', ')
      // },
      // {
      //   name: 'apps',
      //   width: 150,
      //   customRender: (record: IStaff) => record?.apps?.map(e => e.abbreviation).join(', ')
      // },
      // {
      //   name: 'nativeLocation',
      //   width: 150,
      //   customRender: (record: IStaff) => record?.nativeLocation?.map(e => e.abbreviation).join(', ')
      // },
      {
        name: 'active',
        width: 80,
        customRender: (record: IStaff) => <RenderCheck value={record.active} />
      },
      // {
      //   name: 'code',
      //   width: 80,
      //   customRender: (record: IStaff) => <RenderCheck value={record.code} />
      // },
      {
        name: 'canAccessToApp',
        width: 80,
        customRender: (record: IStaff) => <RenderCheck value={record.canAccessToApp} />
      },
      {
        name: 'canAccessToWeb',
        width: 80,
        customRender: (record: IStaff) => <RenderCheck value={record.canAccessToWeb} />
      },
      {
        name: 'plus',
        width: 80,
        customRender: (record: IStaff) => <RenderCheck value={record.plus} />
      }
      // {
      //   name: 'timeZone',
      //   width: 150,
      //   customRender: (record: IStaff) => record?.timeZone?.map(e => e.abbreviation).join(', ')
      // },
      // {
      //   name: 'canUseAuthenticator',
      //   width: 150,
      //   customRender: (record: IStaff) => <RenderCheck value={record.canUseAuthenticator} />
      // }
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
