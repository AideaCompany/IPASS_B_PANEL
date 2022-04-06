import { ColumnType } from 'antd/lib/table'
import { ITranslations } from '../../i18n/types'
import { ColumnFactoryType } from '@/types/typeTemplate'
import GetColumnSearchProps from './GetColumnSearchProps'
const ColumnFactory = <T,>(props: {
  columns: ColumnFactoryType<T>[]
  translate: ITranslations
  operations: (render: T, index?: number) => JSX.Element
  operationOptions?: unknown
  nonShowOperation?: boolean
}): ColumnType<T>[] => {
  const { columns, operations, translate, nonShowOperation, operationOptions } = props
  const getColumns = () => [
    ...columns.map(e => {
      let allColumnns = { key: e.name, title: translate[e.name], dataIndex: e.name } as ColumnType<T>
      if (e.customRender) {
        allColumnns = {
          ...allColumnns,
          render: (_, record, index) => {
            if (e.customRender) {
              // console.log(record)
              return e.customRender(record, index)
            }
          }
        }
      }
      if (e.search) {
        allColumnns = {
          key: e.name,
          title: translate[e.name],
          dataIndex: e.name,
          ...GetColumnSearchProps(e.name, translate, translate[e.name], e.customRender, e.filteredValue)
        }
      }
      if (e.sort) {
        /*eslint-disable*/
        //@ts-ignore
        allColumnns = { ...allColumnns, sorter: (a, b) => a[e.name] - b[e.name] }
      }
      if (e.width) {
        allColumnns = { ...allColumnns, width: e.width }
      }
      if (e.fixed) {
        allColumnns = {
          ...allColumnns,
          fixed: e.fixed
        }
      }
      if (e.ellipsis) {
        allColumnns = {
          ...allColumnns,
          ellipsis: true
        }
      }
      if (e.filter) {
        allColumnns = {
          ...allColumnns,
          filters: e.filter,
          onFilter: (value, record) => {
            if (e.customFilter) {
              //@ts-ignore
              return record[e.name][e.customFilter].includes(value)
            }
            //@ts-ignore
            return record.name.indexOf(value) === 0
          }
        }
      }
      return { ...allColumnns }
    })
  ]

  return nonShowOperation
    ? [...getColumns()]
    : [
        ...getColumns(),
        {
          key: 'operacion',
          title: translate.operationTable,
          dataIndex: 'operacion',
          width: 180,
          //@ts-ignore
          ...operationOptions,
          render: (_, record, index) => operations(record, index)
        }
      ]
}
export default ColumnFactory
