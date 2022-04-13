//types
import { deleteProduct } from '@/graphql/product/mutation/deleteProduct'
import { updateProduct } from '@/graphql/product/mutation/updateProduct'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, IProduct, IProducts, IService, PermissionsPrivilege, Privilege } from '@/types/types'
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
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  services: IService[]
  lang: string
  after: () => void
}): ColumnType<IProduct>[] => {
  const { translations, actualPermission, permision, after, services } = props
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
          FormItems={<FormItems translations={translations} isUpdate />}
          formElements={formElements(services)}
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
        name: 'brand'
      },
      {
        name: 'photo'
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
