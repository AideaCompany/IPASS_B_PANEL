//types
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

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
  translations: ITranslations
  actualPermisions: IPermissionsPrivilege
  deleteMutation: DocumentNode
  updateMutation: DocumentNode
  permission: IPrivilege
  beforeShowUpdate?: (param: IContact) => IContact
  after: () => void
  manageMentError?: (err: unknown) => void
}): ColumnType<IContact>[] => {
  const { translations, actualPermisions, deleteMutation, updateMutation, manageMentError, beforeShowUpdate, after, permission } = props
  const { theme } = useContext(ThemeContext)

  const operations = (record: IContact) => (
    <>
      {(record.verifiedData !== null || record.verifiedDataPDF !== null) && <ShowVerificationModal translations={translations} record={record} />}
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermisions}
        translations={translations}
        mutation={updateMutation}
        record={record}
        FormItems={<Formitems record={record} permission={permission} id={record._id} translations={translations} isUpdate />}
        formElements={formElements()}
        afterUpdate={after}
        manageMentError={manageMentError}
      />
      {
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermisions}
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
