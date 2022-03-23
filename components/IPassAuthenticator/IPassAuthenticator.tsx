import { Button, Modal, Spin } from 'antd'
import QrCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'
import { QRCodeIcon } from './personalIcons'
import { getQr, verifyQrStatus } from './services'
var myInterval: any
const IPassAuthenticator = ({ onLogin }: { onLogin: (value: string, isWorker: boolean) => void }) => {
  const [visible, setVisible] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string; name: string; lastName: string }>()
  useEffect(() => {
    if (visible) {
      getCycle()
    }
    return () => {
      myInterval && clearInterval(myInterval)
    }
  }, [visible])

  const getCycle = async () => {
    setLoading(true)
    const code = await getQr(process.env.NEXT_PUBLIC_CLIENT_ID as string)
    setCode(code.code ? code.code : '')
    setLoading(false)
    var tries = 0
    myInterval = setInterval(async function () {
      if (tries === 50) {
        clearInterval(myInterval)
        getCycle()
      }
      try {
        const data = await verifyQrStatus(code.code)
        if (data.status === 'ok') {
          clearInterval(myInterval)
          onLogin(data.token, data.isWorker)
          setVisible(false)
        } else if (data.message !== 'Dont verified') {
          clearInterval(myInterval)
        }
      } catch (error) {}

      tries++
    }, 500)
  }

  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => {
          setUser(undefined)
          setVisible(false)
        }}
      >
        {loading ? (
          <Spin />
        ) : (
          <>
            {!user ? (
              <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <p>Ingresa a tu app Ipass y escanea el código </p>
                <QrCode value={code} size={300} level={'M'} />
              </div>
            ) : (
              <div>
                <p>{`Nombre: ${user?.name}`}</p>
                <p>{`Apellido: ${user?.lastName}`}</p>
                <p>{`Email: ${user?.email}`}</p>
              </div>
            )}
          </>
        )}
      </Modal>
      <Button onClick={() => setVisible(true)} style={{ width: '100%', marginTop: '10px' }} shape={'round'} type={'primary'} icon={<QRCodeIcon />}>
        Iniciar con Ipass authenticator
      </Button>
    </>
  )
}

export default React.memo(IPassAuthenticator)
