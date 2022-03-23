//types
import { Translations } from '@/i18n/types'
// import { ThemeContext } from '@/providers/ThemeContext'
import { PermissionsPrivilege, Privilege } from '@/types/types'
import { getTime } from '@/utils/utils'
import { Tag } from 'antd'
import { ColumnType } from 'antd/lib/table'
//Providets
// import { DocumentNode } from 'graphql'
import React from 'react'
//component
import ColumnFactory from '../../crudFunctions/columnFactory'
import SeeReport from '../SeeReport'

// import DeleteItem from '../crudFuntions/delete'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
}): ColumnType<any>[] => {
  const { translations, actualPermission } = props
  const operations = (record: any) => {
    return (
      <>
        <SeeReport actualPermisions={actualPermission} translations={translations} record={record} />
      </>
    )
  }

  return ColumnFactory({
    columns: [
      {
        name: 'type'
      },
      {
        name: 'state',
        customRender: (render: any) =>
          render.state === 'active' || render.state === 'enabled' ? (
            <Tag className="tag_risk_2" color="green">
              Activo
            </Tag>
          ) : (
            <Tag className="tag_risk_2" color="red">
              Eliminado
            </Tag>
          )
      },
      {
        name: 'deletedDate',
        customRender: (render: any) => (render.deletedDate ? <>{getTime(render.deletedDate)}</> : <>Activo</>)
      },
      {
        name: 'whoDeleted',
        customRender: (render: any) => (render.whoDeleted ? <>{render.whoDeleted.email}</> : <>Activo</>)
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
