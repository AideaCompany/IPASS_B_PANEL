//types
import { deleteClient } from '@/graphql/clients/mutations/deleteClient'
<<<<<<< HEAD
import { updateClient } from '@/graphql/clients/mutations/updateClient'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IClient, PermissionsPrivilege, Privilege } from '@/types/types'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { EditFilled, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import moment from 'moment-timezone'
import Link from 'next/link'
>>>>>>> dev
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
<<<<<<< HEAD
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItems'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  beforeShowUpdate?: (param: any) => any
  privileges: Privilege[]
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
=======
import RenderCheck from '../RenderCheck'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  privileges: IPrivilege[]
  after: () => void
  lang: string
  // filters: any[]
}): ColumnType<IClient>[] => {
  const { translations, actualPermission, after, lang } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IClient) => (
    <>
      <Tooltip title="Crear cliente">
        <Link href={{ pathname: '/[lang]/clients/[id]', query: { lang, id: record._id } }}>
          <a>
            <Button style={{ margin: '5px' }} shape="circle" icon={<EditFilled />} />
          </a>
        </Link>
      </Tooltip>
>>>>>>> dev
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
<<<<<<< HEAD
      {
        name: 'plus',
        fixed: 'left',
        search: true,
        width: 100
      },
=======

>>>>>>> dev
      {
        name: 'name1',
        fixed: 'left',
        search: true,
        width: 200
      },
      {
<<<<<<< HEAD
        name: 'lastname1',
        fixed: 'left',
=======
        name: 'lastName1',
>>>>>>> dev
        search: true,
        width: 200
      },
      {
        name: 'phone1',
<<<<<<< HEAD
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
        name: 'lastname2',
        search: true,
        width: 200
      },
      {
        name: 'lastname3',
        search: true,
        width: 200
      },
      {
        name: 'phone2',
=======
>>>>>>> dev
        search: true,
        width: 150
      },
      {
        name: 'email',
        search: true,
        width: 250
      },
      {
<<<<<<< HEAD
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
=======
        name: 'document',
>>>>>>> dev
        search: true,
        width: 150
      },
      {
<<<<<<< HEAD
        name: 'medicalNotes',
        search: true,
        width: 150
      },
      {
        name: 'socialMedia',
        search: true,
        width: 150
=======
        name: 'plus',
        customRender: (record: IClient) => <RenderCheck value={record?.plus} />,
        search: true,
        width: 100
      },
      {
        name: 'createdAt',
        customRender: (record: IClient) => moment.tz(record?.createdAt, 'America/Guatemala').format('DD/MM/YYYY'),
        search: true,
        width: 200
>>>>>>> dev
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
