//types
import { deleteDevice } from '@/graphql/device/mutation/deleteDevice'
import { updateDevice } from '@/graphql/device/mutation/updateDevice'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IDevice, PermissionsPrivilege, Privilege } from '@/types/types'
import { CheckOutlined, EyeOutlined, StopOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IDevice>[] => {
  const { translations, actualPermission, lang, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateDevice)}
        record={record}
        FormItems={<FormItems translations={translations} isUpdate />}
        formElements={formElements()}
        afterUpdate={after}
      />
      <DeleteWithUser
        afterDelete={after}
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteDevice)}
        theme={theme}
        record={record}
      />

      <Link href={{ pathname: '/[lang]/device/[id]', query: { lang, id: record._id } }}>
        <Tooltip placement="top" title={translations.view}>
          <a>
            <EyeOutlined style={{ paddingLeft: '5px' }} />
          </a>
        </Tooltip>
      </Link>
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'name',
        search: true
      },
      {
        name: 'type'
      },
      {
        name: 'serialNumber'
      },
      {
        name: 'status'
      },
      {
        name: 'actualLocation',
        customRender: (record: IDevice) =>
          record.actualLocation ? (
            <p style={{ margin: '0', width: '100%', justifyContent: 'center', display: 'flex' }}>{record.actualLocation.name}</p>
          ) : (
            <p style={{ margin: '0', width: '100%', justifyContent: 'center', display: 'flex' }}>-</p>
          )
      },
      {
        name: 'enableVideo',
        customRender: (record: IDevice) =>
          record.enableVideo ? <CheckOutlined style={{ color: 'rgba(35, 203, 167, 1)' }} /> : <StopOutlined style={{ color: 'rgb(218, 39, 39)' }} />
      },
      {
        name: 'enableTalk',
        customRender: (record: IDevice) =>
          record.enableTalk ? <CheckOutlined style={{ color: 'rgba(35, 203, 167, 1)' }} /> : <StopOutlined style={{ color: 'rgb(218, 39, 39)' }} />
      },
      {
        name: 'timeWait'
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: false
  })
}

export default columns
