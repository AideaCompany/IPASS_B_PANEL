import useAuth from '@/providers/AuthContext'
import { acceptEventExpressFn, denyEventExpressFn } from '@/services/eventExpress'
import { verifiedData, verifiedDataPDF } from '@/types/interfaces'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
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

  //#region functions
  const handleCloseModal = () => {
    setOpen(false)
  }

  const accept = async () => {
    try {
      await acceptEventExpressFn(event?._id as string)
    } catch (error) {
      console.info(error)
    } finally {
      handleCloseModal()
    }
  }

  const deny = async () => {
    try {
      await denyEventExpressFn(event?._id as string)
    } catch (error) {
      console.info(error)
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
              {capitalize((contact as IContact)?.firstName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Apellidos">
              {capitalize((contact as IContact)?.lastName)}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Email">
              {(contact as IContact)?.email}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Teléfono">
              {(contact as IContact)?.phone}
            </Descriptions.Item>
          </Descriptions>
          {(contact as IContact)?.verified &&
            (contact as IContact)?.verifiedData &&
            ((contact as IContact)?.verifiedData as verifiedData).documentNumber && (
              <>
                <Descriptions column={1} title="Información de verificaión">
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre">
                    {(contact as IContact)?.verifiedData?.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Apellidos">
                    {(contact as IContact)?.verifiedData?.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Número DPI">
                    {(contact as IContact)?.verifiedData?.documentNumber}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Género">
                    {(contact as IContact)?.verifiedData?.sex}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nacionalidad">
                    {(contact as IContact)?.verifiedData?.nationality}
                  </Descriptions.Item>
                  <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de nacimiento">
                    {(contact as IContact)?.verifiedData?.birthDate}
                  </Descriptions.Item>
                </Descriptions>
                <p style={{ fontWeight: 'bold' }}>Foto</p>
                <Image width={'100%'} src={`${publicS3}/${((contact as IContact)?.verifiedData as verifiedData)?.photo?.key}`} />
                {(contact as IContact).typeVerified !== 'PASS' && (
                  <>
                    <p style={{ fontWeight: 'bold' }}>Documento Lado A</p>
                    <Image width={'100%'} src={`${publicS3}/${((contact as IContact)?.verifiedData as verifiedData)?.documentA?.key}`} />
                  </>
                )}
                <p style={{ fontWeight: 'bold' }}>{(contact as IContact).typeVerified !== 'PASS' ? 'documento Lado B' : 'Documento'}</p>
                <Image width={'100%'} src={`${publicS3}/${((contact as IContact)?.verifiedData as verifiedData)?.documentB?.key}`} />
              </>
            )}
          {(contact as IContact)?.verified && (contact as IContact).verifiedDataPDF && (
            <>
              <Descriptions column={1} title="Información de verificaión">
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Nombre y Apellido">
                  {(contact as IContact)?.verifiedDataPDF?.name}
                </Descriptions.Item>

                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Número de licencia">
                  {(contact as IContact)?.verifiedDataPDF?.licNum}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de nacimiento">
                  {(contact as IContact)?.verifiedDataPDF?.expedition}
                </Descriptions.Item>
                <Descriptions.Item labelStyle={{ fontWeight: 'bold' }} label="Fecha de expiración">
                  {(contact as IContact)?.verifiedDataPDF?.expiration}
                </Descriptions.Item>
              </Descriptions>
              <p style={{ fontWeight: 'bold' }}>Foto</p>
              <Image width={'100%'} src={`${publicS3}/${((contact as IContact)?.verifiedDataPDF as verifiedDataPDF)?.photo?.key as string}`} />
              {(contact as IContact).typeVerified !== 'PASS' && (
                <>
                  <p style={{ fontWeight: 'bold' }}>Documento Lado A</p>
                  <Image
                    width={'100%'}
                    src={`${publicS3}/${((contact as IContact)?.verifiedDataPDF as verifiedDataPDF)?.documentA?.key as string}`}
                  />
                </>
              )}
              <p style={{ fontWeight: 'bold' }}>{(contact as IContact).typeVerified !== 'PASS' ? 'documento Lado B' : 'Documento'}</p>
              <Image width={'100%'} src={`${publicS3}/${((contact as IContact)?.verifiedDataPDF as verifiedDataPDF)?.documentB?.key as string}`} />
            </>
          )}

          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            event?.invitados?.length > 0 && (
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
            )
          }
        </div>
        {permission.name !== 'super_anfitrion' && event.state === 'waiting' && (event.contact as IContact)?.verified && (
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
