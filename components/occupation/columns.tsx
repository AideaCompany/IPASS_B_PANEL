//types
import { deleteApps } from '@/graphql/apps/mutation/deleteApps'
import { updateApps } from '@/graphql/apps/mutation/updateApps'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IOccupation } from '@/types/interfaces/Occupation/occupation.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'

import { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  after: () => void
  beforeShowUpdate?: (param: any) => any
}): ColumnType<IOccupation>[] => {
  const { translations, actualPermission, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IOccupation) => (
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

  return ColumnFactory<IOccupation>({
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
