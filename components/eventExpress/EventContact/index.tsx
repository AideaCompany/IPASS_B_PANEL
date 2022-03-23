import { IContact } from '@/types/types'
import { capitalize, CommonPropsModal } from '@/utils/utils'
import { UserOutlined } from '@ant-design/icons'
import { Button, Descriptions, Image, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'

const EventContact = ({ contact }: { contact: IContact }) => {
  //#region states
  const [open, setOpen] = useState(false)
  //#endregion states

  //#region functions
  const publicS3 = 'https://ipass-renap-oac.s3.amazonaws.com'

  const handleCloseModal = () => {
    setOpen(false)
  }

  //#endregion functions

  return (
    <>
      <Modal onCancel={handleCloseModal} visible={open} {...CommonPropsModal} width={400}>
        <div className="formContainer">
          <Descriptions column={1} title="Información de visitante">
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre">
              {capitalize(contact.firstName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Apellidos">
              {capitalize(contact.lastName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Email">
              {contact.email}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Teléfono">
              {contact.phone}
            </Descriptions.Item>
          </Descriptions>
          {contact?.verified && contact?.verifiedData && (
            <>
              <Descriptions column={1} title="Información de verificaión">
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre">
                  {contact?.verifiedData?.firstName}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Apellidos">
                  {contact?.verifiedData?.lastName}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Número DPI">
                  {contact?.verifiedData?.documentNumber}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Género">
                  {contact?.verifiedData?.sex}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nacionalidad">
                  {contact?.verifiedData?.nationality}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de nacimiento">
                  {contact?.verifiedData?.birthDate}
                </Descriptions.Item>
              </Descriptions>
              <p style={{ fontWeight: 'bold' }}>Foto</p>
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.photo.key}`} />
              {contact.typeVerified !== 'PASS' && (
                <>
                  <p style={{ fontWeight: 'bold' }}>Documento Lado A</p>
                  <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.documentA.key}`} />
                </>
              )}
              <p style={{ fontWeight: 'bold' }}>{contact.typeVerified !== 'PASS' ? 'Documento Lado B' : 'Documento'}</p>
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.documentB.key}`} />
            </>
          )}
        </div>
      </Modal>
      <Tooltip title="Ver información del contacto">
        <Button style={{ marginRight: 8 }} onClick={() => setOpen(true)} shape="circle" icon={<UserOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(EventContact)
