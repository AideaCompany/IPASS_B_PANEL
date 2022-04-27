//types
import { updateRiskReset } from '@/graphql/riskReset/mutation/updateRiskReset'
import { ITranslations } from '@/i18n/types'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IRiskReset } from '@/types/interfaces/RiskReset/RiskReset.interface'

import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'
import UpdateItem from '../crudFunctions/update'
//component
import { formElements } from './formElements'
import FormItems from './formItem'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: IRiskReset) => IRiskReset
  after: () => void
}): ColumnType<IRiskReset>[] => {
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
