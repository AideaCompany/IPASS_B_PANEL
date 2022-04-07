/*eslint-disable*/
// @ts-nocheck
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import React from 'react'

const ReportContent = (props: { element: ILocation }) => {
  const { element } = props
  let content: JSX.Element = <></>
  //@ts-ignore
  switch (element.type) {
    case 'Locación':
      content = (
        <>
          <div>
            <b>Administradores:</b>

            {element.admins &&
              element.admins.map((admin, i) => (
                <p key={i}>
                  {(admin as IUser).name} {(admin as IUser).lastName}
                  <br />
                  {(admin as IUser).email}
                </p>
              ))}
          </div>
          <hr />
          <p>
            <b>Tipo de locación:</b> {element.typeCheck}
          </p>
          {element.device ? (
            <>
              <p>
                <b>Tipo de raspberry:</b> {element.device.type}
              </p>

              <p>
                <b>Serial del equipo:</b> {element.device.serialNumber}
              </p>
            </>
          ) : (
            <p>
              <b>No hay un dispositivo asociado</b>
            </p>
          )}
        </>
      )
      break
    case 'Usuario':
      content = (
        <>
          <p>
            <b>Nombre:</b> {(element as unknown as IUser).name} {(element as unknown as IUser).lastName}
          </p>
          <p>
            <b>Email:</b> {(element as unknown as IUser).email}
          </p>
          <p>
            <b>Rol:</b> {((element as unknown as IUser).privilegeID as IPrivilege).name}
          </p>
        </>
      )
      break
    case 'Locación Maestra':
      content = (
        <>
          <p>
            <b>Locaciones asociadas:</b>
            {element.location &&
              element.location.map((location: any, i: any) => (
                <div key={i}>
                  <p style={{ marginTop: '5px', marginBottom: '0px' }}>
                    <b>Nombre:</b> {location.name}
                  </p>
                  {location.device ? (
                    <p>
                      <b>Serial:</b> {location.device.serialNumber}
                    </p>
                  ) : (
                    <b>No hay un dispositivo asociado </b>
                  )}
                </div>
              ))}
          </p>
          <hr />
          <p>
            <b>Estado:</b>{' '}
            {element.state === 'active' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          </p>
          <p>
            <b>Usuarios con verificación:</b>{' '}
            {element.onlyAllowAuthUser ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          </p>
          <p>
            <b>Dirección:</b> {element.address}
          </p>
        </>
      )
      break
    case 'Evento':
      content = (
        <>
          <p>
            <b>Host:</b> {element.host.name} {element.host.lastname}
          </p>
          <p>
            <b>Locación:</b> {element.location.name}
          </p>
          <p>
            <b>Dirección:</b> {element.location.address}
          </p>
          <p>
            <b>Usuarios con verificación:</b>{' '}
            {element.onlyAuthUser ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          </p>
        </>
      )
      break
    default:
      break
  }
  return content
}

export default ReportContent
