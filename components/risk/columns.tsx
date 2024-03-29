//types
import { updateRisk } from '@/graphql/risk/mutation/updateRisk'
import { ITranslations } from '@/i18n/types'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IRisk } from '@/types/interfaces/Risk/Risk.interface'

import { Tag } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'
import UpdateItem from '../crudFunctions/update'
//component
import { formElements } from './formElements'
import Formitems from './formItem'
const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: IRisk) => IRisk
  after: () => void
}): ColumnType<IRisk>[] => {
  const { translations, actualPermission, after } = props
  const operations = (record: IRisk) => (
    <>
      <UpdateItem
        afterUpdate={after}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateRisk)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate />}
        formElements={formElements()}
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
        name: 'try',
        search: true
      },
      {
        name: 'ban',
        search: true
      },
      {
        name: 'actions',
        customRender: (record: IRisk) => {
          if (record.actions) {
            return (
              <>
                {record.actions.map((e, i) => (
                  <Tag color="warning" className="tag_risk" key={i}>
                    {e}
                  </Tag>
                ))}
              </>
            )
          }
          return translations.actionsNotDefined
        }
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
