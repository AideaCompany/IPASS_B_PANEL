//types
import { deleteProduct } from '@/graphql/product/mutation/deleteProduct'
import { updateProduct } from '@/graphql/product/mutation/updateProduct'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IProduct, IService } from '@/types/types'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  services: IService[]
  lang: string
  after: () => void
  brands: IBrands[]
}): ColumnType<IProduct>[] => {
  const { translations, actualPermission, permision, brands, after, services } = props
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
        <UpdateItem
          // beforeShowUpdate={beforeShowUpdate}
          afterUpdate={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateProduct)}
          record={record}
          FormItems={<FormItems translations={translations} isUpdate services={services} brands={brands} />}
          formElements={formElements(services, brands)}
        />
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
        name: 'name'
      },
      {
        name: 'abbreviation'
      },
      {
        name: 'brand',
        customRender: (record: IProduct, index) => {
          return record.brand ? (record.brand as IBrands).name : ''
        }
      },
      {
        name: 'photo',
        width: 60,
        customRender: (record: IService, index) => {
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar
                  style={{ border: '1px solid #ff8623', overflow: 'hidden' }}
                  src={<Image preview={true} src={`${process.env.NEXT_PUBLIC_S3}/${record.photo.key}`} />}
                />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      },
      {
        name: 'productType'
      },
      {
        name: 'price'
      },
      {
        name: 'measureType'
      },
      {
        name: 'amount'
      },
      {
        name: 'services'
      },
      {
        name: 'designedFor'
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
