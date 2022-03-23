//types
import { deleteVisitorCategory } from '@/graphql/visitorCategory/mutation/deleteVisitorCategory'
import { updateVisitorCategory } from '@/graphql/visitorCategory/mutation/updateVisitorCategory'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IVisitorCategory, PermissionsPrivilege, Privilege } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
}): ColumnType<IVisitorCategory>[] => {
  const { translations, actualPermission } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IVisitorCategory) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateVisitorCategory)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate />}
        formElements={formElements()}
      />
      <DeleteItem
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(deleteVisitorCategory)}
        theme={theme}
        record={record}
      />
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'name',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
