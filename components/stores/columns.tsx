//types
import { deleteStores } from '@/graphql/stores/mutations/deleteStores'
import { updateStores } from '@/graphql/stores/mutations/updateStores'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'

import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
  timeZone: ITimeZone[]
}): ColumnType<IStores>[] => {
  const { translations, actualPermission, after, timeZone } = props

  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateStores)}
        record={record}
        FormItems={<Formitems translations={translations} timeZone={timeZone} isUpdate />}
        formElements={formElements(timeZone)}
        afterUpdate={after}
      />
      <DeleteWithUser
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteStores)}
        theme={theme}
        record={record}
        afterDelete={after}
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
        name: 'address',
        search: true
      },

      {
        name: 'schedule',
        customRender: (record: any) => record?.schedule?.name
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
