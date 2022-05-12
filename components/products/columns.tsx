//types
import { deleteProduct } from '@/graphql/product/mutation/deleteProduct'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { EditOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Image, Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import Link from 'next/link'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  after: () => void
}): ColumnType<IProduct>[] => {
  const { translations, actualPermission, permision, lang, after } = props
  const { theme } = useContext(ThemeContext)

  // const getFormElements = () => {
  //   switch (permision.name) {
  //     case 'Super_admin':
  //       return formElementsSuperAdmin()
  //     default:
  //       return formElements()
  //   }
  // }

  const operations = (record: IProduct) => {
    return (
      <>
        <Tooltip title="Actualizar producto">
          <Link href={{ pathname: '/[lang]/products/[id]', query: { lang, id: record._id } }}>
            <a>
              <Button style={{ margin: '5px' }} shape="circle" icon={<EditOutlined />} />
            </a>
          </Link>
        </Tooltip>
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(deleteProduct)}
          theme={theme}
          record={record}
        />
      </>
    )
  }

  return ColumnFactory({
    columns: [
      {
        name: 'photo',
        width: 60,
        fixed: 'left',
        customRender: (record: IProduct, index) => {
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar style={{ border: '1px solid #ff8623', overflow: 'hidden' }} src={<Image preview={true} src={`${record.photo.key}`} />} />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      },
      {
        name: 'name',
        width: 100,
        fixed: 'left'
      },
      {
        name: 'abbreviation',
        width: 100
      },
      {
        name: 'brand',
        width: 100,
        //@ts-ignore
        customRender: (record: IProduct) => {
          return record.brand ? (record.brand as IBrands).name : ''
        }
      },
      {
        name: 'productType',
        width: 100
      },
      {
        name: 'price',
        width: 100
      },
      {
        name: 'measureType',
        width: 100
      },
      {
        name: 'amount',
        width: 100
      },
      {
        name: 'services',
        width: 100,
        customRender: (record: IProduct) => (record.services as IService[]).map(e => e.name).join(', ')
      },
      {
        name: 'designedFor',
        width: 100
      }
    ],
    translate: translations,
    //@ts-ignore
    operations: operations,
    operationOptions: {
      fixed: 'right',
      width: 120
    },
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
