//types
import { ITranslations } from '@/i18n/types'
import { IHistoryUser } from '@/types/interfaces/HistoryUser/HistoryUser.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
// import { ThemeContext } from '@/providers/ThemeContext'
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
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: IHistoryUser) => IHistoryUser
}): ColumnType<IHistoryUser>[] => {
  const { translations, actualPermission } = props
  const operations = (record: IHistoryUser) => {
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
        customRender: (render: IHistoryUser) =>
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
        customRender: (render: IHistoryUser) => (render.deletedDate ? <>{getTime(render.deletedDate)}</> : <>Activo</>)
      },
      {
        name: 'whoDeleted',
        customRender: (render: IHistoryUser) => (render.whoDeleted ? <>{(render.whoDeleted as IUser).email}</> : <>Activo</>)
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
