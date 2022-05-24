//types
import { ITranslations } from '@/i18n/types'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IServiceSchedule } from '@/types/interfaces/ServiceSchedule/serviceSchedule.interface'
import { ColumnType } from 'antd/lib/table'
import React from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  after: () => void
  beforeShowUpdate?: (param: any) => any
}): ColumnType<IServiceSchedule>[] => {
  const { translations, actualPermission } = props
  const operations = (record: IServiceSchedule) => <></>

  return ColumnFactory({
    columns: [
      {
        name: 'client',
        search: true
      },
      {
        name: 'staffer',
        search: true
      },
      {
        name: 'hour',
        search: true
      },
      {
        name: 'service',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
