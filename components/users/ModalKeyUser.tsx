import { addKeyUserFn } from '@/services/users'
import { CommonPropsModal } from '@/utils/utils'
import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'

const ModalKeyUser = ({
  visible,
  setOpen,
  getData
}: {
  visible: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  getData: () => void
}) => {
  //#region functions
  const addKey = async (data: any) => {
    const res = await addKeyUserFn(data.key)
    if (res) {
      handleClose()
      getData()
      message.success('Clave de activación agregada con éxito')
    } else {
      message.error('La clave de activación no es valida')
    }
  }

  const handleClose = () => {
    setOpen(false)
  }
  //#endregion functions

  return (
    <Modal visible={visible} {...CommonPropsModal} width={500}>
      <Form onFinish={addKey}>
        <h2>Para habilitar la creación de usuarios y trabajadores, inserta la llave de activación de usuarios</h2>
        <Form.Item name="key" rules={[{ required: true, message: 'Clave obligatoria' }]}>
          <Input placeholder="Key"></Input>
        </Form.Item>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Aceptar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default React.memo(ModalKeyUser)
