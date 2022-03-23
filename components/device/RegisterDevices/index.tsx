import TableDatas from '@/components/TableDatas'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IDevice } from '@/types/types'
import { CommonPropsModal } from '@/utils/utils'
import { BarcodeOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import columns from './Columns'

const RegisterDevices = ({ devices, translations }: { devices: IDevice[]; translations: Translations }) => {
  //#region provider
  const { theme } = useContext(ThemeContext)
  //#endregion provider

  //#region  states
  const [visible, setVisible] = useState(false)
  //#endregion states

  //#region functions
  const handleClose = () => {
    setVisible(false)
  }
  //#endregion functions

  return (
    <>
      <Modal className={`modalCrud${theme}`} {...CommonPropsModal} visible={visible} onCancel={handleClose} width={700}>
        <TableDatas
          columns={columns({
            translations
          })}
          data={devices}
        />
      </Modal>
      <Tooltip title={translations.devicesRegister}>
        <Button style={{ marginRight: 5 }} onClick={() => setVisible(true)} shape="circle" icon={<BarcodeOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(RegisterDevices)
