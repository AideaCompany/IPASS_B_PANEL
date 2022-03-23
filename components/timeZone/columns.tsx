//types
import { deleteTimeZone } from '@/graphql/timeZone/mutations/deleteTimeZone'
import { updateTimeZone } from '@/graphql/timeZone/mutations/updateTimeZone'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IRisk, iTimeZone, PermissionsPrivilege, Privilege } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import moment from 'moment'
import React, { useContext } from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
//component
import { formElements } from './formElements'
import Formitems from './formItem'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<iTimeZone>[] => {
  const { translations, actualPermission, after } = props

  const { theme } = useContext(ThemeContext)

  const operations = (record: IRisk) => (
    <>
      <UpdateItem
        afterUpdate={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateTimeZone)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate />}
        formElements={formElements()}
      />
      <DeleteItem
        afterDelete={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(deleteTimeZone)}
        record={record}
        theme={theme}
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
        name: 'start',
        customRender: (record: iTimeZone) => <span>{moment(record.start).format('HH:mm')}</span>

        // search: true
      },
      {
        name: 'abbreviation'
      },

      {
        name: 'end',
        customRender: (record: iTimeZone) => <span>{moment(record.end).format('HH:mm')}</span>

        // search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
