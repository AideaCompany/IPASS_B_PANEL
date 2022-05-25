//types
import ColumnFactory from '@/components/crudFunctions/columnFactory'
import { ITranslations } from '@/i18n/types'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { ColumnType } from 'antd/lib/table'
import React from 'react'

const columns = (props: { translations: ITranslations }): ColumnType<ILocation>[] => {
  const { translations } = props

  const operations = () => <></>
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
