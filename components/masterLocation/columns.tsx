//types
import { deleteMasterLocationChangeStatus } from '@/graphql/masterLocations/mutation/deleteMasterLocationChangeStatus'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, IMasterLocation, PermissionsPrivilege, Privilege } from '@/types/types'
import { ApartmentOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'
import Link from 'next/link'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  locations: ILocation[]
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IMasterLocation>[] => {
  const { translations, actualPermission, locations, lang, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateMasterLocation)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate locations={locations} />}
        formElements={formElements(locations)}
        afterUpdate={after}
      />
      <DeleteWithUser
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteMasterLocationChangeStatus)}
        theme={theme}
        record={record}
        afterDelete={after}
      />
      <Link href={{ pathname: '/[lang]/diagramaLocation/[id]', query: { lang, id: record._id } }}>
        <a style={{ marginLeft: 8 }}>
          <ApartmentOutlined />
        </a>
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
        name: 'address',
        search: true
      },
      {
        name: 'onlyAllowAuthUSers',
        customRender: (render: IMasterLocation) => (
          <>
            {render.onlyAllowAuthUSers ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CheckCircleFilled style={{ color: 'rgba(35, 203, 167, 1)' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CloseCircleFilled style={{ color: 'rgba(207, 0, 15,1)' }} />
              </div>
            )}
          </>
        )
      },
      {
        name: 'location',
        customRender: (render: IMasterLocation) => <>{render.location?.length}</>
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
