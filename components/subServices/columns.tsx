//types
import { deleteSubService } from '@/graphql/subServices/mutations/deleteSubService'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ISubService } from '@/types/interfaces/SubServices/SubServices.interface'
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
  beforeShowUpdate?: (param: any) => any
  privileges: IPrivilege[]
  after: () => void
  lang: string
  // filters: any[]
  dataProducts: IProduct[] | undefined
}): ColumnType<ISubService>[] => {
  const { translations, actualPermission, after, lang } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <Tooltip title="Actualizar servicio">
        <Link href={{ pathname: '/[lang]/subServices/[id]', query: { lang, id: record._id } }}>
          <a>
            <Button style={{ margin: '5px' }} shape="circle" icon={<EditOutlined />} />
          </a>
        </Link>
      </Tooltip>
      <DeleteItem
        actualPermission={actualPermission}
        afterDelete={after}
        translations={translations}
        mutation={gql(deleteSubService)}
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
        customRender: (record: ISubService, index) => {
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
      {
        name: 'plus',
        search: true,
        width: 150
      },
      /*{
        name: 'products',
        search: true,
        width: 150
      },*/
      {
        name: 'staffers',
        search: true,
        width: 150,
        customRender: (record: unknown) => {
          return (record as IStaff[])?.map(e => e?.name).join(', ')
        }
      },
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
        name: 'subServiceFee',
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
        name: 'subServiceTime',
        search: true,
        width: 150
      },
      {
        name: 'returnTime',
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
