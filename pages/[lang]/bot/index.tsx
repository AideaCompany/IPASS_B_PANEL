import useAuth from '@/providers/AuthContext'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import MainLayout from '@/components/layout/Layout'
import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { Localization } from '@/i18n/types'
import { socket } from 'socket'
import QrCode from 'qrcode.react'
import { Button, message, Modal, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Bot = (props: { localization: Localization; lang: string }) => {
  //#region props
  const { localization, lang } = props
  //#endregion props

  //#region state
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [code, setCode] = useState<string>('')
  const [allowAuth, setAllowAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  //#endregion state

  //providers
  const { permission } = useAuth()

  //#region effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'bot'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        // getData()
        console.log('-')
      }
    })()
  }, [actualPermission])

  useEffect(() => {
    socket.on('qr', data => {
      setLoading(true)
      setCode(data)
      setLoading(false)
    })

    socket.on('ready', data => {
      // setReady(data)
    })
  }, [socket])
  //#endregion effect

  const handleAuthBot = async () => {
    Modal.confirm({
      content: 'Se desvinculara la cuenta actual y permitirá autenticar un nuevo dispositivo',
      onOk: async () => {
        const resp = await fetch('http://localhost:3002/api/login', { method: 'post' })
        const data = await resp.json()
        if (data.ok) {
          message.success({ content: 'Se desvinculó la cuenta satisfactoriamente' })
          setAllowAuth(true)
          setLoading(true)
        }
      }
    })
  }

  return (
    <>
      <MainLayout lang={lang} title={localization?.translations.titleSection} create={<></>} getData={() => ''}>
        <>
          <div className="dataBotContainer">
            <div className="info">
              <h2>Para vincular un dispositivo al bot:</h2>
              <ol>
                <li>
                  Selecciona <strong>Autenticar usuario</strong>, esto desvinculara la cuenta actual y permitirá autenticar un nuevo dispositivo
                </li>
                <li>Abre WhatsApp en tu teléfono</li>
                <li>
                  Toca <strong>Menú</strong> o <strong>Configuración</strong> y selecciona <strong>Dispositivos vinculados</strong>
                </li>
                <li>Cuando se active la cámara, apunta tu teléfono hacia esta pantalla para escanear el código</li>
              </ol>
              <Button type="primary" shape="round" onClick={handleAuthBot}>
                Autenticar usuario
              </Button>
            </div>

            <div className="qrCode">
              {allowAuth ? (
                <Spin indicator={<LoadingOutlined spin />} spinning={code === '' || loading} tip="Generando código qr...">
                  <QrCode value={code} size={300} level={'M'} />
                </Spin>
              ) : (
                <QrCode value={''} style={{ opacity: 0.3 }} size={300} level={'M'} />
              )}
            </div>
          </div>
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(Bot)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'bot')
  return {
    props: {
      localization
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
