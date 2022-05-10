//types
import { deleteClient } from '@/graphql/clients/mutations/deleteClient'
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
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
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
        name: 'name1',
        fixed: 'left',
        search: true,
        width: 200
      },
      {
        name: 'lastName1',
        search: true,
        width: 200
      },
      {
        name: 'phone1',
        search: true,
        width: 150
      },
      {
        name: 'email',
        search: true,
        width: 250
      },
      {
        name: 'document',
        search: true,
        width: 150
      },
      {
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
