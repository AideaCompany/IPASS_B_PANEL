//types
import { deleteStores } from '@/graphql/stores/mutations/deleteStores'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { EditOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IStores>[] => {
  const { translations, actualPermission, after, lang } = props

  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <Tooltip title="Actualizar servicio">
        <Link href={{ pathname: '/[lang]/stores/[id]', query: { lang, id: record._id } }}>
          <EditOutlined />
        </Link>
      </Tooltip>
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
        customRender: (record: any) => (record?.schedule as ITimeZone[])?.map(e => e.name).join(', ')
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
