//types
import { deleteEventExpress } from '@/graphql/eventExpress/mutations/deleteEventExpress'
import { updateEventExpress } from '@/graphql/eventExpress/mutations/updateEventExpress'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact, IEvent, IEventExpress, ILocation, PermissionsPrivilege, Privilege } from '@/types/types'
import { getTime } from '@/utils/utils'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import { capitalize } from 'lodash'
import React, { useContext } from 'react'
import ShowVerificationModal from '../contact/showVerificationModal'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import EventInfo from './EventInfo'
import { formElements } from './formElements'
import FormItems from './formItem'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  locations: ILocation[]
  contacts: IContact[]
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IEvent>[] => {
  const { translations, actualPermission, locations, contacts } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: IEventExpress) => (
    <>
      <EventInfo event={record} />

      {(((record?.contact as IContact)?.verifiedData !== null && (record?.contact as IContact)?.verifiedData?.documentNumber !== null) ||
        (record?.contact as IContact)?.verifiedDataPDF !== null) && <ShowVerificationModal translations={translations} record={record.contact} />}
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        // beforeUpdate={beforeUpdateRecord}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateEventExpress)}
        record={record}
        FormItems={<FormItems contacts={contacts} translations={translations} isUpdate locations={locations} />}
        formElements={formElements(locations, contacts)}
        // afterUpdate={after}
      />

      <DeleteWithUser
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(deleteEventExpress)}
        theme={theme}
        record={record}
        // afterDelete={after}
      />
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'name',
        search: true,
        width: 150,
        ellipsis: true
      },
      {
        name: 'start',
        customRender: (render: IEventExpress) => (render.start ? <>{getTime(render.start)}</> : <span>-</span>),
        width: 180
      },
      {
        name: 'end',
        customRender: (render: IEventExpress, index?: number) => {
          return render.end ? getTime(render.end) : <span>-</span>
        },
        width: 180
      },

      {
        name: 'authorizedBy',
        ellipsis: true,
        customRender: (render: IEventExpress) =>
          render.authorizedBy ? `${capitalize(render.authorizedBy.name)} ${capitalize(render.authorizedBy.lastname)}` : <span>-</span>
      },
      {
        name: 'state',
        customRender: (render: IEventExpress) => {
          if (render.state === 'waiting') {
            return <ClockCircleOutlined className="iconEventExpressWaiting " />
          } else if (render.state === 'enable') {
            return <CheckCircleOutlined className="iconEventExpressEnable" />
          } else {
            return <CloseCircleOutlined className="iconEventExpressDeny" />
          }
        },
        width: 100
      },
      {
        name: 'hourIn',
        customRender: (render: IEventExpress) => (render.hourIn ? <>{getTime(render.hourIn)}</> : <span>-</span>),
        ellipsis: true
      },
      {
        name: 'hourOut',
        customRender: (render: IEventExpress) => (render.hourOut ? <>{getTime(render.hourOut)}</> : <span>-</span>),
        ellipsis: true
      },
      {
        name: 'location',
        ellipsis: true,
        customRender: (render: IEventExpress) => <>{`${(render?.location as ILocation)?.name}`}</>
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: false
  })
}

export default columns
