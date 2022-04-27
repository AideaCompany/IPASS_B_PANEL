/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { verifyContactID } from '@/services/contact'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { Button, Modal, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../providers/ThemeContext'
const ContactVerifiedModal = ({
  record,
  setvisible,
  visible,
  showVerify = true
}: {
  record: IContact
  setvisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  showVerify?: boolean
}) => {
  const [loading, setLoading] = useState(false)
  const verifyUser = async () => {
    setLoading(true)
    try {
      await verifyContactID(record?._id)
      setvisible(false)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.info(error)
    }
  }

  const { theme } = useContext(ThemeContext)
  const shouldShow = () => {
    if (showVerify) {
      return true
    }
    if (record?.verified) {
      return true
    }
    return false
  }
  return (
    <Modal
      destroyOnClose
      footer={[
        <>
          <Button key="back" onClick={() => setvisible(false)}>
            {record?.verified ? 'ok' : 'Cancelar'}
          </Button>
          {!record?.verified && showVerify && (
            <Button type="primary" loading={loading} onClick={verifyUser}>
              Autenticar
            </Button>
          )}
        </>
      ]}
      onCancel={() => setvisible(false)}
      className={`modalCrud${theme}`}
      visible={visible}
      // title={'Verificado'}
      maskClosable={true}
      centered
      width={1200}
    >
      <div className="verificationModal">
        {shouldShow() && (
          <div className="images">
            <div className="containerPhoto">
              <div className="containerTitle flex">
                <h2>Foto de Perfil</h2>
              </div>

              <Tooltip title="Ver foto">
                <a
                  target="blank"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  href={`${process.env.NEXT_PUBLIC_S3 as string}/${
                    record?.typeVerified === 'DPI' || record?.typeVerified === 'PASS'
                      ? record?.verifiedData?.photo?.key
                      : record?.verifiedDataPDF?.photo?.key
                  }`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3}/${
                      record?.typeVerified === 'DPI' || record?.typeVerified === 'PASS'
                        ? record?.verifiedData?.photo?.key
                        : record?.verifiedDataPDF?.photo?.key
                    }`}
                  />
                </a>
              </Tooltip>
            </div>
            {record?.typeVerified !== 'PASS' && (
              <div className="containerFront">
                <div className="containerTitle flex">
                  <h2>{record?.verifiedData ? 'Foto DPI Delantera' : 'Foto licencia delantera'}</h2>
                </div>

                <Tooltip title="Ver foto">
                  <a
                    target="blank"
                    style={{ display: 'flex', justifyContent: 'center' }}
                    href={`${process.env.NEXT_PUBLIC_S3}/${
                      record?.verifiedData ? record?.verifiedData?.documentA?.key : record?.verifiedDataPDF?.documentA?.key
                    }`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3}/${
                        record?.verifiedData ? record?.verifiedData?.documentA?.key : record?.verifiedDataPDF?.documentA?.key
                      }`}
                    />
                  </a>
                </Tooltip>
              </div>
            )}
            <div className="containerBack">
              <div className="containerTitle flex">
                <h2>{record?.typeVerified === 'PASS' ? 'Foto pasaporte' : record?.verifiedData ? 'Foto DPI Trasera' : 'Foto licencia trasera'}</h2>
              </div>
              <Tooltip title="Ver foto">
                <a
                  target="blank"
                  style={{ display: 'flex', justifyContent: 'center' }}
                  href={`${process.env.NEXT_PUBLIC_S3}/${
                    record?.typeVerified === 'DPI' || record?.typeVerified === 'PASS'
                      ? record?.verifiedData?.documentB?.key
                      : record?.verifiedDataPDF?.documentB?.key
                  }`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_S3}/${
                      record?.typeVerified === 'DPI' || record?.typeVerified === 'PASS'
                        ? record?.verifiedData?.documentB?.key
                        : record?.verifiedDataPDF?.documentB?.key
                    }`}
                  />
                </a>
              </Tooltip>
            </div>
          </div>
        )}
        <div className="containerInfo">
          {shouldShow() && !record?.verificationRegistro && (
            <div className="info">
              {record?.verifiedData && record?.verifiedData.documentNumber ? (
                <>
                  <h2>{record.typeVerified !== 'PASS' ? 'Lectura MRZ' : 'Lectura pasaporte'}</h2>
                  <div>
                    <h3>Nombre:</h3>
                    <span>{record?.verifiedData?.firstName}</span>
                  </div>
                  <div>
                    <h3>Apellido:</h3>
                    <span>{record?.verifiedData?.lastName}</span>
                  </div>
                  <div>
                    <h3>Número DPI:</h3>
                    <span>{record?.verifiedData?.documentNumber}</span>
                  </div>
                  <div>
                    <h3>Fecha de Expiración</h3>
                    <span>{record?.verifiedData?.expirationDate}</span>
                  </div>
                  <div>
                    <h3>Genero:</h3>
                    <span>{record?.verifiedData?.sex}</span>
                  </div>
                  <div>
                    <h3>Nacionalidad:</h3>
                    <span>{record?.verifiedData?.nationality}</span>
                  </div>
                  <div>
                    <h3>Fecha de Nacimiento:</h3>
                    <span>{record?.verifiedData?.birthDate}</span>
                  </div>
                </>
              ) : (
                <>
                  <h2>Lectura Licencia</h2>
                  <div>
                    <h3>Nombre:</h3>
                    <span>{record?.verifiedDataPDF?.name}</span>
                  </div>
                  <div>
                    <h3>Número licencia:</h3>
                    <span>{record?.verifiedDataPDF?.licNum}</span>
                  </div>
                  <div>
                    <h3>Fecha de Expiración</h3>
                    <span>{record?.verifiedDataPDF?.expiration}</span>
                  </div>
                  <div>
                    <h3>Fecha de expedición:</h3>
                    <span>{record?.verifiedDataPDF?.expedition}</span>
                  </div>
                  <div>
                    <h3>Tipo de licencia:</h3>
                    <span>{record?.verifiedDataPDF?.type}</span>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="info2">
            <div className="data" style={!record?.verified ? { height: '100%' } : {}}>
              <h2>Datos de contacto</h2>
              <div>
                <h3>Nombre:</h3>
                <span>{record?.firstName}</span>
              </div>
              <div>
                <h3>Apellido:</h3>
                <span>{record?.lastName}</span>
              </div>
              <div>
                <h3>Email:</h3>
                <span>{record?.email}</span>
              </div>
              <div>
                <h3>Documento:</h3>
                <span>{record?.DPI}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default React.memo(ContactVerifiedModal)
