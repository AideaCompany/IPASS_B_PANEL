//types
import { deleteService } from '@/graphql/services/mutations/deleteService'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  privileges: IPrivilege[]
  after: () => void
  // filters: any[]
  lang: string
}): ColumnType<IService>[] => {
  const { translations, actualPermission, lang, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IService) => (
    <>
      <Tooltip title="Actualizar servicio">
        <Link href={{ pathname: '/[lang]/services/[id]', query: { lang, id: record._id } }}>
          <a>
            <Button style={{ margin: '5px' }} shape="circle" icon={<EditOutlined />} />
          </a>
        </Link>
      </Tooltip>
      <DeleteItem
        actualPermission={actualPermission}
        afterDelete={after}
        translations={translations}
        mutation={gql(deleteService)}
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
        customRender: (record: IService, index) => {
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
        fixed: 'left',
        width: 150,
        search: true
      },
      {
        name: 'abbreviation',
        fixed: 'left',
        width: 150,
        search: true
      },
      // {
      //   name: 'type',
      //   fixed: 'left',
      //   width: 150,
      //   search: true
      // },
      // {
      //   name: 'plus',
      //   search: true,
      //   customRender: (record: IService) => <RenderCheck value={record.plus} />,
      //   width: 150
      // },
      {
        name: 'eta',
        search: true,
        width: 150
      },
      {
        name: 'price',
        search: true,
        width: 150
      },
      {
        name: 'cost',
        search: true,
        width: 150
      },
      {
        name: 'serviceFee',
        search: true,
        width: 150
      },
      {
        name: 'taxes',
        search: true,
        width: 150
      },
      {
        name: 'discounts',
        search: true,
        width: 150
      },
      {
        name: 'serviceTime',
        search: true,
        width: 150
      },
      {
        name: 'returnTime',
        search: true,
        width: 150
      },
      {
        name: 'sex',
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
