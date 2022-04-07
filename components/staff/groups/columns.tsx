//types
import { deleteStaff } from '@/graphql/Staff/mutation/deleteStaff'
import { updateStaff } from '@/graphql/Staff/mutation/updateStaff'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../../crudFunctions/columnFactory'
import DeleteItem from '../../crudFunctions/delete'
import UpdateItem from '../../crudFunctions/update'
import { formElements } from './formElements'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  beforeShowUpdate?: (param: IStaff) => IStaff
  formItem: JSX.Element
  after: () => void
  permision: IPrivilege
  location: ILocation[]
}): ColumnType<IStaff>[] => {
  const { translations, actualPermission, location, after, formItem, beforeShowUpdate, permision } = props
  const { theme } = useContext(ThemeContext)

  const getFormElements = () => {
    return formElements(location)
  }

  const operations = (record: IStaff) => {
    return (
      <>
        <UpdateItem
          beforeShowUpdate={beforeShowUpdate}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateStaff)}
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
          mutation={gql(deleteStaff)}
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
