import useAuth from '@/providers/AuthContext'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import MainLayout from '@/components/layout/Layout'
import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { Localization } from '@/i18n/types'
import { socket } from 'socket'
import QrCode from 'qrcode.react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Bot = (props: { localization: Localization; lang: string }) => {
  //#region props
  const { localization, lang } = props
  //#endregion props

  //#region state
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [code, setCode] = useState<string>('')
  const [ready, setReady] = useState(false)

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
      setCode(data)
    })

    socket.on('ready', data => {
      setReady(data)
    })
  }, [socket])

  //#endregion effect
  return (
    <>
      <MainLayout lang={lang} title={localization?.translations.titleSection} create={<></>} getData={() => ''}>
        <div className="dataBotContainer">
          <div className="info">
            <h2>Para vincular un dispositivo al bot:</h2>
            <ol>
              <li>Abre WhatsApp en tu teléfono</li>
              <li>
                Toca <strong>Menú</strong> o <strong>Configuración</strong> y selecciona <strong>Dispositivos vinculados</strong>
              </li>
              <li>Cuando se active la cámara, apunta tu teléfono hacia esta pantalla para escanear el código</li>
            </ol>
          </div>

          <div className="qrCode">
            {code ? (
              <QrCode value={code} size={300} level={'M'} />
            ) : (
              <Spin
                size="large"
                style={{ color: '#000', background: 'rgba(255, 255, 255, 0.5)' }}
                indicator={<LoadingOutlined spin />}
                tip="Generando código QR..."
                className="generating"
              >
                <QrCode value={code} size={300} level={'M'} />
              </Spin>
            )}
          </div>
        </div>
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
