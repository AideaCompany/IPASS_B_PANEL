import { ThemeContext } from '@/providers/ThemeContext'
import { resetTokenFn } from '@/services/users'
import { IWorker, User } from '@/types/types'
import { RedoOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import React, { useContext } from 'react'

const ResetToken = ({ record, type, after }: { record: User | IWorker; type: string; after: () => void }) => {
  //#region provider
  const { theme } = useContext(ThemeContext)
  //#endregion provider

  //#region  functions
  const resetTokenAlert = () => {
    Modal.warning({
      title: '¿Está seguro de resetear el token?',
      centered: true,
      className: `modalCrud${theme}`,
      onOk: async () => {
        await resetTokenFn(record._id, type)
        after()
      },
      maskClosable: true,
      okCancel: true,
      cancelText: 'Cancelar'
    })
  }
  //#endregion functions

  return (
    <Tooltip title="Reiniciar Token">
      <Button style={{ marginLeft: 8 }} onClick={() => resetTokenAlert()} icon={<RedoOutlined />} size="small" shape="circle" />
    </Tooltip>
  )
}

export default React.memo(ResetToken)
