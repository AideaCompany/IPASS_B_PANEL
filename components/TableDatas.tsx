import React from 'react'
import { Table } from 'antd'
import { TablePropsCompoenet } from '../types/types'

const TableData = (props: TablePropsCompoenet): JSX.Element => {
  const { data, columns, loading, pagination, onChange, scroll, aditionalProps } = props
  return (
    <Table
      rowClassName={() => {
        return 'rowTable'
      }}
      scroll={scroll ? { ...scroll } : { y: '60vh' }}
      pagination={pagination}
      dataSource={data}
      columns={columns}
      loading={loading ? true : false}
      className="tableData"
      style={{ width: '100%' }}
      size="small"
      onChange={onChange && onChange}
      {...aditionalProps}
    />
  )
}

export default React.memo(TableData)
