//types
import { deleteClient } from '@/graphql/clients/mutations/deleteClient'
import { updateClient } from '@/graphql/clients/mutations/updateClient'

import { ThemeContext } from '@/providers/ThemeContext'
import { IClient } from '@/types/types'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import RenderCheck from '../RenderCheck'
import FormItems from './formItems'
import { ITranslations } from '@/i18n/types'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  beforeShowUpdate?: (param: any) => any
  privileges: IPrivilege[]
  after: () => void
  // filters: any[]
}): ColumnType<IClient>[] => {
  const { translations, actualPermission, after, beforeShowUpdate } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateClient)}
        record={record}
        afterUpdate={after}
        FormItems={<FormItems translations={translations} isUpdate />}
        formElements={formElements()}
      />
      <DeleteItem
        actualPermission={actualPermission}
        afterDelete={after}
        translations={translations}
        mutation={gql(deleteClient)}
        theme={theme}
        record={record}
      />
    </>
  )
  return ColumnFactory({
    columns: [
      {
        name: 'photo',
        fixed: 'left',
        width: 60,
        customRender: (record: IClient, index) => {
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
        name: 'plus',
        fixed: 'left',
        customRender: (record: IClient) => <RenderCheck value={record.plus} />,
        search: true,
        width: 100
      },
      {
        name: 'name1',
        fixed: 'left',
        search: true,
        width: 200
      },
      {
        name: 'lastName1',
        fixed: 'left',
        search: true,
        width: 200
      },
      {
        name: 'phone1',
        fixed: 'left',
        search: true,
        width: 150
      },
      {
        name: 'createdAt',
        fixed: 'left',
        search: true,
        width: 200
      },
      {
        name: 'document',
        search: true,
        width: 150
      },
      {
        name: 'name2',
        search: true,
        width: 200
      },
      {
        name: 'lastName2',
        search: true,
        width: 200
      },
      {
        name: 'lastName3',
        search: true,
        width: 200
      },
      {
        name: 'phone2',
        search: true,
        width: 150
      },
      {
        name: 'email',
        search: true,
        width: 250
      },
      {
        name: 'privateAddress',
        search: true,
        width: 150
      },
      {
        name: 'businessAddress',
        search: true,
        width: 150
      },
      {
        name: 'occupation',
        search: true,
        width: 150
      },
      {
        name: 'age',
        search: true,
        width: 150
      },
      {
        name: 'sex',
        search: true,
        width: 150
      },
      {
        name: 'ranking',
        search: true,
        width: 150
      },
      {
        name: 'channel',
        search: true,
        width: 150
      },
      {
        name: 'lastVisit',
        search: true,
        width: 150
      },
      {
        name: 'referrals',
        search: true,
        width: 150
      },
      {
        name: 'servicesNotes',
        search: true,
        width: 150
      },
      {
        name: 'productsNotes',
        search: true,
        width: 150
      },
      {
        name: 'medicalNotes',
        search: true,
        width: 150
      },
      {
        name: 'socialMedia',
        search: true,
        width: 150
      },
      {
        name: 'country',
        search: true,
        width: 150
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
