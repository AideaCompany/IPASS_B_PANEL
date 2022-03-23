//types
import ColumnFactory from '@/components/crudFunctions/columnFactory'
import { Translations } from '@/i18n/types'
import { IDevice } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import React from 'react'
import QRDevice from './QRDevice'
//component

const columns = (props: { translations: Translations }): ColumnType<IDevice>[] => {
  const { translations } = props

  const operations = (record: any) => (
    <>
      <QRDevice device={record} translations={translations} />
    </>
  )

  return ColumnFactory({
    columns: [
      {
        name: 'serialNumber',
        customRender: (record: IDevice) => <>{record.serialNumber.slice(record.serialNumber.length - 4)}</>
      },
      {
        name: 'registro',
        customRender: (_: any, index?: number) => <span>{(index as number) + 1}</span>
      },
      {
        name: 'actualLocation',
        customRender: (record: IDevice) =>
          record.actualLocation ? (
            <p style={{ margin: '0', width: '100%', justifyContent: 'center', display: 'flex' }}>{record.actualLocation.abbreviation}</p>
          ) : (
            <p style={{ margin: '0', width: '100%', justifyContent: 'center', display: 'flex' }}>-</p>
          )
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: false
  })
}

export default columns
