//types
import { ITranslations } from '@/i18n/types'
import { IAuthenticator } from '@/types/interfaces/Authenticator/Authenticator.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

import { ColumnType } from 'antd/lib/table'
import moment from 'moment-timezone'
import React from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
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
        name: 'lastName',
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
