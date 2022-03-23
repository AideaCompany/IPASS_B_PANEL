import { Descriptions } from 'antd'
import React from 'react'
import Main from '../../components/main'

const mantenimiento = () => {
  return (
    <Main title={'Certificado de Propiedad'}>
      <div className="mainContainerLogin">
        <div className="containerForm keyContainer">
          <div className="image_key">
            <img src="/IPASS_R_pages-to-jpg-0001.png" alt="licencia" />
          </div>
          <div className="infoKey">
            <Descriptions column={1} title={`Certificado: PROPIEDAD DE LICENCIAMIENTO R+`} bordered>
              <Descriptions.Item label="Estado">Activo</Descriptions.Item>
              <Descriptions.Item label="Fecha de emisión">ENERO 25 DEL 2022</Descriptions.Item>
              <Descriptions.Item label="Fecha de caducidad">ENERO 25 DEL 2023</Descriptions.Item>
              <Descriptions.Item label="A favor de">REGISTRO NACIONAL DE LAS PERSONAS RENAP</Descriptions.Item>
              <Descriptions.Item label="País">GUATEMALA</Descriptions.Item>
              <Descriptions.Item label="Emisor">IPASS GUATEMALA</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </div>
    </Main>
  )
}

export default mantenimiento
