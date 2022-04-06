import React from 'react'
import { Table } from 'antd'
import { ITablePropsComponent } from '../types/types'

const TableData = <T,>(props: ITablePropsComponent<T>): JSX.Element => {
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

export default TableData
