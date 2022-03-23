//types
import { Translations } from '@/i18n/types'
import { IAuthenticator, PermissionsPrivilege, Privilege } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment-timezone'
import React from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
}): ColumnType<IAuthenticator>[] => {
  const { translations } = props
  const operations = () => <></>

  return ColumnFactory({
    columns: [
      {
        name: 'app',
        customRender: (record: any) => record.app.name
      },
      {
        name: 'name',
        search: true
      },
      {
        name: 'lastname',
        search: true
      },
      {
        name: 'email',
        search: true
      },
      {
        name: 'document',
        search: true
      },
      {
        name: 'createdAt',
        customRender: (record: any) => moment.tz(record.createdAt, 'America/Guatemala').format('DD/MM/YYYY hh:mm A')
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: true
  })
}

export default columns
