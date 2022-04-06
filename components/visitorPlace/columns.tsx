//types
import { deleteVisitorCategory } from '@/graphql/visitorCategory/mutation/deleteVisitorCategory'
import { updateVisitorCategory } from '@/graphql/visitorCategory/mutation/updateVisitorCategory'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IVisitorPlace } from '@/types/interfaces/VisitorPlace/visitorPlace.interface'

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
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: IVisitorPlace) => void
}): ColumnType<IVisitorPlace>[] => {
  const { translations, actualPermission } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IVisitorPlace) => (
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

  return ColumnFactory<IVisitorPlace>({
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
