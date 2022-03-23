//types
import ColumnFactory from '@/components/crudFunctions/columnFactory'
import { Translations } from '@/i18n/types'
import { IContact, ILocation } from '@/types/types'
import { ColumnType } from 'antd/lib/table'
import React from 'react'

const columns = (props: { translations: Translations }): ColumnType<ILocation>[] => {
  const { translations } = props

  const operations = (record: IContact) => <></>
  return ColumnFactory({
    columns: [
      {
        name: 'firstName'
      },
      {
        name: 'lastName'
      },
      {
        name: 'DPI'
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: true
  })
}

export default columns
