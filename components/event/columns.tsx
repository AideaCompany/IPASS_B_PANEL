/* eslint-disable no-unused-vars */
//types
import { deleteEventChangeStatus } from '@/graphql/event/mutation/deleteEventChangeStatus'
import { updateEvent } from '@/graphql/event/mutation/updateEvent'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
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
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  locations: ILocation[]
  beforeShowUpdate?: (param: IEvent) => IEvent
  after: () => void
}): ColumnType<IEvent>[] => {
  const { translations, actualPermission, locations, after } = props
  const { theme } = useContext(ThemeContext)
  const beforeUpdateRecord = (record: IEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    record.start = record.rangeTime[0]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    record.end = record.rangeTime[1]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    delete record.rangeTime
    return record
  }
  const beforeShowUpdate = (record: IEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    record.rangeTime = [moment(record.start), moment(record.end)]
    return record
  }
  const operations = (record: IEvent) => (
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
        customRender: (render: IEvent) => <>{`${(render?.location as ILocation)?.name}`}</>
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
