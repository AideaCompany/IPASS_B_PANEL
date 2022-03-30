//types
import { deleteGroupWorker } from '@/graphql/worker/mutation/deleteGroupWorker'
import { updateGroupWorker } from '@/graphql/worker/mutation/updateGroupWorker'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, IWorker, PermissionsPrivilege, Privilege } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../../crudFunctions/columnFactory'
import DeleteItem from '../../crudFunctions/delete'
import UpdateItem from '../../crudFunctions/update'
import { formElements } from './formElements'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  beforeShowUpdate?: (param: any) => any
  formItem: JSX.Element
  after: () => void
  permision: Privilege
  location: ILocation[]
}): ColumnType<IWorker>[] => {
  const { translations, actualPermission, location, after, formItem, beforeShowUpdate, permision } = props
  const { theme } = useContext(ThemeContext)

  const getFormElements = () => {
    return formElements(location)
  }

  const operations = (record: IWorker) => {
    return (
      <>
        <UpdateItem
          beforeShowUpdate={beforeShowUpdate}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateGroupWorker)}
          record={record}
          afterUpdate={after}
          FormItems={formItem}
          formElements={getFormElements()}
          paramTitle="titleModalUpdateGroup"
        />
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(deleteGroupWorker)}
          theme={theme}
          record={record}
        />
      </>
    )
  }

  return ColumnFactory({
    columns: [
      {
        name: 'name',
        search: true
      },
      {
        name: 'abbreviation',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
