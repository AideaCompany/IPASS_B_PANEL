//types
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact, ILocation, PermissionsPrivilege, Privilege } from '@/types/types'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { DocumentNode } from 'graphql'
import React, { useContext } from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'
//component
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItemUpdate'
import ShowVerificationModal from './showVerificationModal'
const columns = (props: {
  translations: Translations
  actualPermisions: PermissionsPrivilege
  deleteMutation: DocumentNode
  updateMutation: DocumentNode
  permission: Privilege
  beforeShowUpdate?: (param: any) => any
  after: () => void
  manageMentError?: (err: any) => void
}): ColumnType<ILocation>[] => {
  const { translations, actualPermisions, deleteMutation, updateMutation, manageMentError, beforeShowUpdate, after, permission } = props
  const { theme } = useContext(ThemeContext)

  const operations = (record: IContact) => (
    <>
      {(record.verifiedData !== null || record.verifiedDataPDF !== null) && <ShowVerificationModal translations={translations} record={record} />}
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        //@ts-ignore
        actualPermission={actualPermisions as any}
        translations={translations}
        mutation={updateMutation}
        record={record}
        FormItems={<Formitems record={record} permission={permission} id={record._id} translations={translations} isUpdate />}
        formElements={formElements()}
        afterUpdate={after}
        manageMentError={manageMentError}
      />
      {
        //@ts-ignore
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermisions as any}
          translations={translations}
          mutation={deleteMutation}
          theme={theme}
          record={record}
        />
      }
    </>
  )
  return ColumnFactory({
    columns: [
      {
        name: 'DPI',
        search: true
      },
      {
        name: 'firstName',
        search: true
      },
      {
        name: 'lastName',
        search: true
      },
      {
        name: 'email',
        search: true
      },
      {
        name: 'phone',
        search: true
      },
      {
        name: 'verified',
        customRender: (render: IContact) => (
          <>
            {render.verified ? (
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
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermisions?.update && !actualPermisions?.delete && true
  })
}

export default columns
