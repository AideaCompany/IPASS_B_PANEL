import useAuth from '@/providers/AuthContext'
import { getDeviceById } from '@/services/device'
import { IDevice } from '@/types/types'
import { Descriptions, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Main from '../../components/main'

const index = () => {
  const router = useRouter()

  //#region providers
  const { setSpinning } = useAuth()
  //#endregion providers

  //#region states
  const [device, setDevice] = useState<IDevice>()
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region functions
  const getData = async () => {
    try {
      setSpinning(true)
      setDevice(await getDeviceById(router.query.id as string))
    } catch (error) {
      message.error('Error al obtener el dispositivo')
    } finally {
      setSpinning(false)
    }
  }

  console.log(device)
  //#endregion functions

  return (
    <Main title={device?.name}>
      <div className="mainContainerLogin">
        <div className="containerForm" style={{ width: 375 }}>
          {device && (
            <Descriptions column={1} title={`Dispositivo: ${device?.name}`} bordered>
              <Descriptions.Item label="Serial">{device?.serialNumber}</Descriptions.Item>
              <Descriptions.Item label="Locación">{device?.actualLocation.name}</Descriptions.Item>
              <Descriptions.Item label="Tipo">{device?.type}</Descriptions.Item>
              <Descriptions.Item label="Video Habilitado">{device?.enableVideo ? 'SI' : 'NO'}</Descriptions.Item>
              <Descriptions.Item label="Audio Habilitado">{device?.enableTalk ? 'SI' : 'NO'}</Descriptions.Item>
              <Descriptions.Item label="Tiempo de espera">{device?.timeWait}</Descriptions.Item>
            </Descriptions>
          )}
        </div>
      </div>
    </Main>
  )
}

export default React.memo(index)
