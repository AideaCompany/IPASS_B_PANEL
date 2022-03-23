//types
import { updateRiskReset } from '@/graphql/riskReset/mutation/updateRiskReset'
import { Translations } from '@/i18n/types'
import { IRisk, IRiskReset, PermissionsPrivilege, Privilege } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'
import UpdateItem from '../crudFunctions/update'
//component
import { formElements } from './formElements'
import FormItems from './formItem'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IRisk>[] => {
  const { translations, actualPermission, after } = props
  const operations = (record: IRiskReset) => (
    <>
      <UpdateItem
        afterUpdate={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateRiskReset)}
        record={record}
        FormItems={<FormItems translations={translations} isUpdate />}
        formElements={formElements()}
      />
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'time',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
