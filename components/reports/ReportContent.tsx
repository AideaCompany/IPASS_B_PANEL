import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import React from 'react'

const ReportContent = (props: { element: any }) => {
  const { element } = props
  var content: JSX.Element = <></>
  switch (element.type) {
    case 'Locación':
      content = (
        <>
          <div>
            <b>Administradores:</b>
            {element.admins &&
              element.admins.map((admin: any, i: any) => (
                <p key={i}>
                  {admin.name} {admin.lastname}
                  <br />
                  {admin.email}
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
            <b>Nombre:</b> {element.name} {element.lastname}
          </p>
          <p>
            <b>Email:</b> {element.email}
          </p>
          <p>
            <b>Rol:</b> {element.privilegeID.name}
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
