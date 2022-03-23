//types
import { deleteLocationChangeStatus } from '@/graphql/location/mutation/deleteLocationChangeStatus'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, PermissionsPrivilege, Privilege } from '@/types/types'
import { EditFilled } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import Link from 'next/link'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  after: () => void
}): ColumnType<ILocation>[] => {
  const { translations, actualPermission, permision, lang, after } = props
  const { theme } = useContext(ThemeContext)

  // const getFormElements = () => {
  //   switch (permision.name) {
  //     case 'Super_admin':
  //       return formElementsSuperAdmin()
  //     default:
  //       return formElements()
  //   }
  // }

  const operations = (record: ILocation) => {
    return (
      <>
        <Tooltip placement="top" title={translations.edit}>
          <Link href={{ pathname: '/[lang]/location/[id]', query: { lang, id: record._id } }}>
            <a>
              <EditFilled style={{ paddingLeft: '5px', fontSize: '18px', color: 'Dodgerblue' }} />
            </a>
          </Link>
        </Tooltip>
        <DeleteWithUser
          actualPermisions={actualPermission}
          translations={translations}
          mutation={gql(deleteLocationChangeStatus)}
          theme={theme}
          record={record}
          afterDelete={after}
        />
        {/* {permision.name === 'admin' && <MangeHost record={record} translations={translations} />} */}
      </>
    )
  }

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
        name: 'typeCheck',
        search: true,
        customRender: render => (render === 'in' ? 'entrada' : 'salida')
      },
      {
        name: 'abbreviation'
      },
      {
        name: 'device',
        customRender: (record: ILocation) => {
          return record.device ? (
            <Link href={{ pathname: '/[lang]/device/[id]', query: { lang, id: record.device?._id } }}>
              <a style={{ color: 'Dodgerblue' }}>{record.device?.name}</a>
            </Link>
          ) : (
            <p style={{ margin: '0', width: '100%', justifyContent: 'center', display: 'flex' }}>-</p>
          )
        }
      },
      {
        name: 'state'
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
