import useAuth from '@/providers/AuthContext'
import { acceptEventExpressFn, denyEventExpressFn } from '@/services/eventExpress'
import { IContact, IEventExpress, ILocation } from '@/types/types'
import { capitalize, CommonPropsModal, getTime } from '@/utils/utils'
import { InfoOutlined } from '@ant-design/icons'
import { Button, Descriptions, Image, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'

const EventInfo = ({ event }: { event: IEventExpress }) => {
  const { contact } = event
  const publicS3 = 'https://ipass-renap-oac.s3.amazonaws.com'

  //#region provider
  const { permission } = useAuth()
  //#endregion provider
  //#region states
  const [open, setOpen] = useState(false)
  //#endregion states

  console.log(contact)
  //#region functions
  const handleCloseModal = () => {
    setOpen(false)
  }

  const accept = async () => {
    try {
      await acceptEventExpressFn(event?._id)
    } catch (error) {
      console.log(error)
    } finally {
      handleCloseModal()
    }
  }

  const deny = async () => {
    try {
      await denyEventExpressFn(event?._id)
    } catch (error) {
      console.log(error)
    } finally {
      handleCloseModal()
    }
  }

  //#region  functions

  return (
    <>
      <Modal onCancel={handleCloseModal} visible={open} {...CommonPropsModal} width={400}>
        <div className="formContainer">
          <Descriptions column={1} title="Información del Evento">
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre">
              {event?.name}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Locación">
              {(event?.location as ILocation)?.name}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Motivo">
              {event?.motivo}
            </Descriptions.Item>
            {event.start && (
              <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Inicio">
                {getTime(event.start)}
              </Descriptions.Item>
            )}
            {event.end && (
              <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Teléfono">
                {getTime(event.end)}
              </Descriptions.Item>
            )}
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Hora de entrada">
              {event?.hourIn ? getTime(event.hourIn) : '-'}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Hora de salida">
              {event?.hourOut ? getTime(event.hourOut) : '-'}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={1} title="Información de visitante">
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre">
              {capitalize(contact?.firstName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Apellidos">
              {capitalize(contact?.lastName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Email">
              {contact?.email}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Teléfono">
              {contact?.phone}
            </Descriptions.Item>
          </Descriptions>
          {contact?.verified && contact?.verifiedData && contact?.verifiedData.documentNumber && (
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
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.photo?.key}`} />
              {contact.typeVerified !== 'PASS' && (
                <>
                  <p style={{ fontWeight: 'bold' }}>Documento Lado A</p>
                  <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.documentA?.key}`} />
                </>
              )}
              <p style={{ fontWeight: 'bold' }}>{contact.typeVerified !== 'PASS' ? 'documento Lado B' : 'Documento'}</p>
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedData?.documentB?.key}`} />
            </>
          )}
          {contact?.verified && contact.verifiedDataPDF && (
            <>
              <Descriptions column={1} title="Información de verificaión">
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre y Apellido">
                  {contact?.verifiedDataPDF?.name}
                </Descriptions.Item>

                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Número de licencia">
                  {contact?.verifiedDataPDF?.licNum}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de nacimiento">
                  {contact?.verifiedDataPDF?.expedition}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de expiración">
                  {contact?.verifiedDataPDF?.expiration}
                </Descriptions.Item>
              </Descriptions>
              <p style={{ fontWeight: 'bold' }}>Foto</p>
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedDataPDF?.photo?.key}`} />
              {contact.typeVerified !== 'PASS' && (
                <>
                  <p style={{ fontWeight: 'bold' }}>Documento Lado A</p>
                  <Image width={'100%'} src={`${publicS3}/${contact?.verifiedDataPDF?.documentA?.key}`} />
                </>
              )}
              <p style={{ fontWeight: 'bold' }}>{contact.typeVerified !== 'PASS' ? 'documento Lado B' : 'Documento'}</p>
              <Image width={'100%'} src={`${publicS3}/${contact?.verifiedDataPDF?.documentB?.key}`} />
            </>
          )}
          {event.invitados.length > 0 && (
            <div>
              <h2>Información de visitates extra</h2>
              {(event.invitados as IContact[]).map(e => {
                return (
                  <Descriptions key={e._id} column={1} title={`${capitalize(e.firstName)} ${capitalize(e.lastName)}`}>
                    <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Email">
                      {e?.email}
                    </Descriptions.Item>
                    <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Teléfono">
                      {e?.phone}
                    </Descriptions.Item>
                  </Descriptions>
                )
              })}
            </div>
          )}
        </div>
        {permission.name !== 'super_anfitrion' && event.state === 'waiting' && event.contact?.verified && (
          <div className="container__buttons">
            <Button danger onClick={deny}>
              Rechazar Evento
            </Button>
            <Button type="primary" onClick={accept}>
              Aceptar Evento
            </Button>
          </div>
        )}
      </Modal>
      <Tooltip title="Información del evento">
        <Button size="small" style={{ marginRight: 8 }} onClick={() => setOpen(true)} shape="circle" icon={<InfoOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(EventInfo)
