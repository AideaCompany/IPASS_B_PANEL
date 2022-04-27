import TableDatas from '@/components/TableDatas'
import { ITranslations } from '@/i18n/types'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'

import { TableRowSelection } from 'antd/lib/table/interface'
import React from 'react'
import columns from './ColumnsContact'

const Tablecontac = ({
  data,
  translations,
  selectedContact,
  setSelectedContact
}: {
  data: IContact[]
  translations: ITranslations
  selectedContact: React.Key[]
  setSelectedContact: React.Dispatch<React.SetStateAction<React.Key[]>>
}) => {
  //#region functions
  const rowSelection: TableRowSelection<IContact> = {
    onChange: (selectedRows: React.Key[]) => {
      setSelectedContact(selectedRows)
    },
    selectedRowKeys: selectedContact,
    type: 'radio',
    columnTitle: 'Seleccionar',
    columnWidth: 100
  }

  //#endregion functions
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <TableDatas aditionalProps={{ rowSelection }} pagination={false} scroll={{ y: '40vh' }} columns={columns({ translations })} data={data} />
}

export default React.memo(Tablecontac)
