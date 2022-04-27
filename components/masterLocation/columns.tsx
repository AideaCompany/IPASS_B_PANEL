//types
import { deleteMasterLocationChangeStatus } from '@/graphql/masterLocations/mutation/deleteMasterLocationChangeStatus'
import { updateMasterLocation } from '@/graphql/masterLocations/mutation/updateMasterLocation'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IMasterLocation } from '@/types/interfaces/MasterLocation/MasterLocation.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ApartmentOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import Link from 'next/link'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  locations: ILocation[]
  beforeShowUpdate?: (param: IMasterLocation) => void
  after: () => void
}): ColumnType<IMasterLocation>[] => {
  const { translations, actualPermission, locations, lang, after } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IMasterLocation) => (
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
