import useSecurity from '@/providers/SecurityContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { typeQr } from '@/types/interfaces/valuesAddQr'

import { getSex, getTime } from '@/utils/utils'
import { EyeFilled } from '@ant-design/icons'
import { Modal, Tooltip } from 'antd'
import React, { useContext } from 'react'

const UserCard = () => {
  const { lastEntries, setEventData, setShowEvent } = useSecurity()
  const showEvent = (event: IEvent) => {
    setEventData(event)
    setShowEvent(true)
  }

  const { theme } = useContext(ThemeContext)

  const seeImages = () => {
    Modal.success({
      className: `modalCrud${theme}`,
      content: (
        <div className="formContainer">
          <div className="containerPhoto">
            <h2>Foto de Perfil</h2>
            <img
              src={
                (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                  ? `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedData?.photo.key}`
                  : //@ts-ignore
                    `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedDataPDF.photo.key}`
              }
            />
          </div>
          {(lastEntries?.contact as IContact).typeVerified !== 'PASS' && (
            <div className="containerFront">
              <h2>Foto lado A</h2>
              <img
                src={
                  (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                    ? `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedData?.documentA.key}`
                    : //@ts-ignore
                      `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedDataPDF.documentA.key}`
                }
              />
            </div>
          )}
          <div className="containerBack">
            <h2>Foto lado B</h2>
            <img
              src={
                (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                  ? `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedData?.documentB.key}`
                  : //@ts-ignore
                    `${process.env.NEXT_PUBLIC_S3}/${(lastEntries?.contact as IContact)?.verifiedDataPDF.documentB.key}`
              }
            />
          </div>
        </div>
      ),
      icon: <></>
    })
  }
  console.log(lastEntries)
  return (
    <div className="userCards">
      <div className="container_right">
        <h1>{'Último ingreso'}</h1>
        {lastEntries && (
          <>
            {lastEntries.typeQr === typeQr.event && (
              <>
                {(lastEntries.contact as IContact)?.verified ? (
                  <>
                    <div className="info">
                      <div className="mainInfo">
                        <div>
                          <h2>Nombre:</h2>
                          <div>
                            <p>{(lastEntries.contact as IContact)?.verifiedData?.firstName}</p>
                          </div>
                        </div>

                        <div>
                          <h2>Apellido:</h2>
                          <div>
                            <p>{(lastEntries.contact as IContact)?.verifiedData?.lastName}</p>
                          </div>
                        </div>

                        <div>
                          <h2>{(lastEntries?.contact as IContact)?.verifiedData?.documentNumber ? 'Número DPI' : 'Numero Licencia'}</h2>
                          <div>
                            <p>
                              {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                ? (lastEntries.contact as IContact)?.verifiedData?.documentNumber
                                : (lastEntries?.contact as IContact)?.verifiedDataPDF?.licNum}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="images">
                        <Tooltip title="Ver imagen">
                          <a
                            target="blank"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            href={
                              (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                ? (lastEntries.contact as IContact)?.verifiedData?.photo?.key
                                : (lastEntries?.contact as IContact)?.verifiedDataPDF?.photo?.key
                            }
                            className="images"
                          >
                            <img
                              src={
                                (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                  ? `${process.env.NEXT_PUBLIC_S3}/${(lastEntries.contact as IContact)?.verifiedData?.photo.key}`
                                  : //@ts-ignore
                                    `${process.env.NEXT_PUBLIC_S3}/${(lastEntries.contact as IContact)?.verifiedDataPDF?.photo.key as string}`
                              }
                            />
                          </a>
                        </Tooltip>
                      </div>
                      <div>
                        <h2>Fecha de Expiración</h2>
                        <div>
                          <p>
                            {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                              ? (lastEntries.contact as IContact)?.verifiedData?.expirationDate
                              : (lastEntries?.contact as IContact)?.verifiedDataPDF?.expiration}
                          </p>
                        </div>
                      </div>
                      {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber && (
                        <>
                          <div>
                            <h2>Genero:</h2>
                            <div>
                              <p>{getSex((lastEntries.contact as IContact)?.verifiedData?.sex as string)}</p>
                            </div>
                          </div>
                          <div>
                            <h2>Nacionalidad:</h2>
                            <div>
                              <p>{(lastEntries.contact as IContact)?.verifiedData?.nationality}</p>
                            </div>
                          </div>
                          <div>
                            <h2>Fecha de Nacimiento:</h2>
                            <div>
                              <p>{(lastEntries.contact as IContact)?.verifiedData?.birthDate}</p>
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <h2>Ver documentos:</h2>
                        <div>
                          <Tooltip title="Ver">
                            <EyeFilled style={{ cursor: 'pointer' }} onClick={seeImages} />
                          </Tooltip>
                        </div>
                      </div>
                      <div>
                        <h2>Hora de ingreso:</h2>
                        <div>
                          <p>{getTime(lastEntries.hourIn)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Datos del ingreso</h2>
                    <div className="info">
                      <div>
                        <h2>Nombre:</h2>
                        <div>
                          <span>{(lastEntries.contact as IContact)?.firstName}</span>
                        </div>
                      </div>
                      <div>
                        <h2>Apellido:</h2>
                        <div>
                          <span>{(lastEntries?.contact as IContact)?.lastName}</span>
                        </div>
                      </div>
                      <div>
                        {lastEntries.contact && (
                          <>
                            <h2>Email:</h2>
                            <div>
                              <span>{(lastEntries?.contact as IContact)?.email}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <h2>Datos del evento</h2>
                <div className="info">
                  <div>
                    <h2>Nombre del evento:</h2>
                    <div>
                      <Tooltip title="Ver evento">
                        <span style={{ cursor: 'pointer' }} onClick={() => showEvent(lastEntries.event as IEvent)}>
                          {(lastEntries.event as IEvent)?.name}
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                  <div>
                    <h2>Horario Inicio:</h2>
                    <div>
                      <span>{`${getTime((lastEntries.event as IEvent)?.start)}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Horario Fin:</h2>
                    <div>
                      <span>{`${getTime((lastEntries.event as IEvent)?.end)}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Anfitrión:</h2>
                    <div>
                      <span>{`${((lastEntries.event as IEvent)?.host as IUser)?.name} ${
                        ((lastEntries.event as IEvent)?.host as IUser)?.lastName
                      }`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Email anfitrión:</h2>
                    <div>
                      <span>{`${((lastEntries.event as IEvent)?.host as IUser)?.email}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Locación:</h2>
                    <div>
                      <span>{`${((lastEntries.event as IEvent)?.location as ILocation)?.name}--${
                        ((lastEntries.event as IEvent)?.location as ILocation)?.address
                      }`}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {[typeQr.worker, typeQr.worker_temporal].includes(lastEntries.typeQr as typeQr) && (
              <>
                <h2>Datos de staffer</h2>
                <div className="info">
                  {/*                  
                  <div>
                    <h2>Nombre:</h2>
                    <div>
                      <span>{lastEntries.worker?.name}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Apellido:</h2>
                    <div>
                      <span>{lastEntries?.worker?.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Email:</h2>
                    <div>
                      <span>{lastEntries?.worker?.email}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Documento:</h2>
                    <div>
                      <span>{lastEntries?.worker?.document}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Locación nativa:</h2>
                    <div>
                      <span>{(lastEntries?.worker?.nativeLocation).map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Grupo:</h2>
                    <div>
                      <span>{(lastEntries?.worker?.group).map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Horario:</h2>
                    <div>
                      <span>{(lastEntries?.worker?.timeZone).map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>*/}
                </div>
              </>
            )}
            {[typeQr.user_temporal].includes(lastEntries.typeQr as typeQr) && (
              <>
                <h2>Datos de usuario</h2>
                <div className="info">
                  {(lastEntries.user as IUser)?.photo?.key && (
                    <div className="images">
                      <a
                        target="blank"
                        style={{ display: 'flex', justifyContent: 'center' }}
                        href={`${process.env.NEXT_PUBLIC_S3}/${(lastEntries.user as IUser)?.photo?.key}`}
                        className="images"
                      >
                        <img src={`${process.env.NEXT_PUBLIC_S3}/${(lastEntries.user as IUser)?.photo?.key}`} />
                      </a>
                    </div>
                  )}
                  <div>
                    <h2>Nombre:</h2>
                    <div>
                      <span>{(lastEntries.user as IUser)?.name}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Apellido:</h2>
                    <div>
                      <span>{(lastEntries?.user as IUser)?.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Email:</h2>
                    <div>
                      <span>{(lastEntries?.user as IUser)?.email}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Documento:</h2>
                    <div>
                      <span>{(lastEntries?.user as IUser)?.document}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Locación nativa:</h2>
                    <div>
                      <span>{((lastEntries?.user as IUser)?.nativeLocation as ILocation[])?.map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Grupo:</h2>
                    <div>
                      <span>{((lastEntries?.user as IUser)?.group as IGroupWorker[])?.map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Horario:</h2>
                    <div>
                      <span>{((lastEntries?.user as IUser)?.timeZone as ITimeZone[])?.map(e => e.abbreviation).join(' ,')}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {lastEntries.typeQr === typeQr.eventExpress && (
              <>
                {(lastEntries.contact as IContact)?.verified ? (
                  <>
                    <div className="info">
                      <div className="mainInfo">
                        <div>
                          <h2>Nombre:</h2>
                          <div>
                            <p>{(lastEntries.contact as IContact)?.firstName}</p>
                          </div>
                        </div>

                        <div>
                          <h2>Apellido:</h2>
                          <div>
                            <p>{(lastEntries.contact as IContact)?.lastName}</p>
                          </div>
                        </div>

                        <div>
                          <h2>{(lastEntries?.contact as IContact)?.verifiedData?.documentNumber ? 'Número DPI' : 'Numero Licencia'}</h2>
                          <div>
                            <p>
                              {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                ? (lastEntries.contact as IContact)?.verifiedData?.documentNumber
                                : (lastEntries?.contact as IContact)?.verifiedDataPDF?.licNum}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="images">
                        <Tooltip title="Ver imagen">
                          <a
                            target="blank"
                            style={{ display: 'flex', justifyContent: 'center' }}
                            href={
                              (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                ? (lastEntries.contact as IContact)?.verifiedData?.photo?.key
                                : (lastEntries?.contact as IContact)?.verifiedDataPDF?.photo?.key
                            }
                            className="images"
                          >
                            <img
                              src={
                                (lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                                  ? `${process.env.NEXT_PUBLIC_S3}/${(lastEntries.contact as IContact)?.verifiedData?.photo.key}`
                                  : //@ts-ignore
                                    `${process.env.NEXT_PUBLIC_S3}/${(lastEntries.contact as IContact)?.verifiedDataPDF?.photo.key as string}`
                              }
                            />
                          </a>
                        </Tooltip>
                      </div>
                      <div>
                        <h2>Fecha de Expiración</h2>
                        <div>
                          <p>
                            {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber
                              ? (lastEntries.contact as IContact)?.verifiedData?.expirationDate
                              : (lastEntries?.contact as IContact)?.verifiedDataPDF?.expiration}
                          </p>
                        </div>
                      </div>
                      {(lastEntries?.contact as IContact)?.verifiedData?.documentNumber && (
                        <>
                          <div>
                            <h2>Genero:</h2>
                            <div>
                              <p>{getSex((lastEntries.contact as IContact)?.verifiedData?.sex as string)}</p>
                            </div>
                          </div>
                          <div>
                            <h2>Nacionalidad:</h2>
                            <div>
                              <p>{(lastEntries.contact as IContact)?.verifiedData?.nationality}</p>
                            </div>
                          </div>
                          <div>
                            <h2>Fecha de Nacimiento:</h2>
                            <div>
                              <p>{(lastEntries.contact as IContact)?.verifiedData?.birthDate}</p>
                            </div>
                          </div>
                        </>
                      )}
                      <div>
                        <h2>Ver documentos:</h2>
                        <div>
                          <Tooltip title="Ver">
                            <EyeFilled style={{ cursor: 'pointer' }} onClick={seeImages} />
                          </Tooltip>
                        </div>
                      </div>
                      <div>
                        <h2>Hora de ingreso:</h2>
                        <div>
                          <p>{getTime(lastEntries.hourIn)}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Datos del ingreso</h2>
                    <div className="info">
                      <div>
                        <h2>Nombre:</h2>
                        <div>
                          <span>{(lastEntries.contact as IContact)?.firstName}</span>
                        </div>
                      </div>
                      <div>
                        <h2>Apellido:</h2>
                        <div>
                          <span>{(lastEntries?.contact as IContact)?.lastName}</span>
                        </div>
                      </div>
                      <div>
                        {lastEntries.contact && (
                          <>
                            <h2>Email:</h2>
                            <div>
                              <span>{(lastEntries.contact as IContact)?.email}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <h2>Datos del evento</h2>
                <div className="info">
                  <div>
                    <h2>Nombre del evento:</h2>
                    <div>
                      <Tooltip title="Ver evento">
                        <span style={{ cursor: 'pointer' }} onClick={() => showEvent(lastEntries.event as IEvent)}>
                          {(lastEntries.eventExpress as IEventExpress)?.name}
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                  <div>
                    <h2>Horario Inicio:</h2>
                    <div>
                      <span>{`${getTime((lastEntries.eventExpress as IEventExpress)?.start)}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Horario Fin:</h2>
                    <div>
                      <span>{`${getTime((lastEntries.eventExpress as IEventExpress)?.end)}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Anfitrión:</h2>
                    <div>
                      <span>{`${((lastEntries.eventExpress as IEventExpress)?.host as IUser)?.name} ${
                        ((lastEntries.eventExpress as IEventExpress)?.host as IUser)?.lastName
                      }`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Email anfitrión:</h2>
                    <div>
                      <span>{`${((lastEntries.eventExpress as IEventExpress)?.host as IUser)?.email}`}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Locación:</h2>
                    <div>
                      <span>{`${((lastEntries.eventExpress as IEventExpress)?.location as ILocation)?.name}--${
                        ((lastEntries.eventExpress as IEventExpress)?.location as ILocation)?.address
                      }`}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* (
              <>
                <h2>Datos del ingreso</h2>
                <div className="info">
                  <div>
                    <h2>Nombre:</h2>
                    <div>
                      <span>{(lastEntries.host as IUser)?.name}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Apellido:</h2>
                    <div>
                      <span>{(lastEntries?.host as IUser)?.lastName}</span>
                    </div>
                  </div>
                  <div>
                    <h2>Email:</h2>
                    <div>
                      <span>{(lastEntries?.host as IUser)?.email}</span>
                    </div>
                  </div>
                </div>
              </>
            ) */}
          </>
        )}
      </div>
    </div>
  )
}

export default UserCard
