//types
import { deleteApps } from '@/graphql/apps/mutation/deleteApps'
import { updateApps } from '@/graphql/apps/mutation/updateApps'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps, PermissionsPrivilege, Privilege } from '@/types/types'
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
  after: () => void
  beforeShowUpdate?: (param: any) => any
}): ColumnType<IApps>[] => {
  const { translations, actualPermission, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IApps) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        afterUpdate={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateApps)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate />}
        formElements={formElements()}
      />
      <DeleteItem
        afterDelete={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(deleteApps)}
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
      },
      {
        name: 'abbreviation',
        search: true
      },
      {
        name: 'tokenKey',
        search: true
      },
      {
        name: 'url',
        search: true
      },
      {
        name: 'clientID',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
