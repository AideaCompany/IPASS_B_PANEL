/* eslint-disable @typescript-eslint/ban-ts-comment */
//types
import { ITranslations } from '@/i18n/types'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ColumnType } from 'antd/lib/table'
import moment from 'moment-timezone'
import React from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'

const columns = (props: {
  translations: ITranslations
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: ILocationEntries) => void
}): ColumnType<ILocationEntries>[] => {
  const { translations } = props
  const operations = () => <></>

  return ColumnFactory({
    columns: [
      // {
      //   name: 'type',
      //   customRender: (render: ILocationEntries) => render,
      //   search: true
      // },
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
        customRender: (render: ILocationEntries) => render.host as string
      },
      {
        name: 'location',
        customRender: (render: ILocationEntries) => (render?.location as ILocation).name
      },
      {
        name: 'name',
        //@ts-ignore
        customRender: (render: string) => render,
        search: true
      },
      {
        name: 'lastName',
        //@ts-ignore
        customRender: (render: string) => render,
        search: true
      },
      {
        name: 'document',
        //@ts-ignore
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
