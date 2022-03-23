//types
import { Translations } from '@/i18n/types'
import { ILocation, ILocationEntries, Privilege } from '@/types/types'
import { typeQr } from '@/types/valuesAddQr'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment-timezone'
import React from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
const columns = (props: {
  translations: Translations
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
}): ColumnType<ILocationEntries>[] => {
  const { translations } = props
  const operations = () => <></>

  return ColumnFactory({
    columns: [
      {
        name: 'type',
        customRender: (render: typeQr) => render,
        search: true
      },
      {
        name: 'date',
        customRender: (render: ILocationEntries) => <>{moment.tz(render.createdAt, 'America/Guatemala').format('YYYY-MM-DD')}</>
      },
      {
        name: 'in',
        customRender: (render: ILocationEntries) =>
          render.hourIn ? moment.tz(render.hourIn, 'America/Guatemala').format('YYYY-MM-DD, hh:mm:ss a') : <>-</>
      },
      {
        name: 'out',
        customRender: (render: ILocationEntries) =>
          render.hourOut ? moment.tz(render.hourOut, 'America/Guatemala').format('YYYY-MM-DD, hh:mm:ss a') : <>-</>
      },
      {
        name: 'host',
        customRender: (render: ILocationEntries) => render.host
      },
      {
        name: 'location',
        customRender: (render: ILocationEntries) => (render?.location as ILocation).name
      },
      {
        name: 'name',
        customRender: (render: string) => render,
        search: true
      },
      {
        name: 'lastname',
        customRender: (render: string) => render,
        search: true
      },
      {
        name: 'document',
        customRender: (render: string) => render,
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: true
  })
}

export default columns
