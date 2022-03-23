//types
import { deleteEventChangeStatus } from '@/graphql/event/mutation/deleteEventChangeStatus'
import { updateEvent } from '@/graphql/event/mutation/updateEvent'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IEvent, ILocation, PermissionsPrivilege, Privilege } from '@/types/types'
import { getTime } from '@/utils/utils'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import moment from 'moment-timezone'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'
import ManageGuest from './ManageGuest'
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  locations: ILocation[]
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IEvent>[] => {
  const { translations, actualPermission, locations, after } = props
  const { theme } = useContext(ThemeContext)
  const beforeUpdateRecord = (record: any) => {
    record.start = record.rangeTime[0]
    record.end = record.rangeTime[1]
    const { rangeTime, ...newRecord } = record
    return newRecord
  }
  const beforeShowUpdate = (record: any) => {
    record.rangeTime = [moment(record.start), moment(record.end)]
    return record
  }
  const operations = (record: any) => (
    <>
      <ManageGuest translations={translations} record={record} />
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        beforeUpdate={beforeUpdateRecord}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateEvent)}
        record={record}
        FormItems={<FormItems translations={translations} isUpdate locations={locations} />}
        formElements={formElements(locations)}
        afterUpdate={after}
      />
      <DeleteWithUser
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteEventChangeStatus)}
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
        name: 'start',
        customRender: (render: IEvent) => <>{getTime(render.start)}</>
      },
      {
        name: 'end',
        customRender: (render: IEvent) => <>{getTime(render.end)}</>
      },
      {
        name: 'location',
        customRender: (render: IEvent) => <>{`${render?.location?.name}`}</>
      },
      {
        name: 'beforeStart'
      },
      {
        name: 'onlyAuthUser',
        customRender: (render: IEvent) => (
          <>
            {render.onlyAuthUser ? (
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
    nonShowOperation: false
  })
}

export default columns
