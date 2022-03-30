//types
import { deleteVisitorBrand } from '@/graphql/visitorBrand/mutation/deleteVisitorBrand'
import { updateVisitorBrand } from '@/graphql/visitorBrand/mutation/updateVisitorBrand'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'
import { IVisitorBrand } from '@/types/interfaces/VistorBrand/VisitorBrand.interface'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'
const columns = (props: {
  translations: Translations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  categories: IVisitorCategory[]
  beforeShowUpdate?: (param: IVisitorBrand) => IVisitorBrand
}): ColumnType<IVisitorBrand>[] => {
  const { translations, actualPermission, categories } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IVisitorBrand) => (
    <>
      <UpdateItem
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateVisitorBrand)}
        record={record}
        FormItems={<FormItems translations={translations} isUpdate categories={categories} />}
        formElements={formElements(categories)}
      />
      <DeleteItem actualPermission={actualPermission} translations={translations} mutation={gql(deleteVisitorBrand)} theme={theme} record={record} />
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'name'
      },
      {
        name: 'photo',
        customRender: render =>
          render.photo ? (
            <div className={'imageInTable'}>
              <img src={render.photo.key} />
            </div>
          ) : (
            <p>No foto</p>
          )
      },
      {
        name: 'category',
        customRender: render => <p>{render.category?.name ? render.category?.name : 'Sin categoría'}</p>
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
