import { getConfigFn } from '@/services/config'
import { IConfig } from '@/types/interfaces/config/Config.interface'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Modal } from 'antd'
import React, { useEffect, useState } from 'react'

const ModalConfig = ({ visible, setVisible }: { visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [config, setConfig] = useState<IConfig>()
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    setConfig(await getConfigFn())
  }

  return (
    <>
      <div className="icon">
        <SettingOutlined />
      </div>
      <Modal onCancel={() => setVisible(false)} visible={visible}>
        <List.Item>
          <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
            <p>Configuración</p>
            <p>Valor</p>
            <p>Acción</p>
          </div>
        </List.Item>
        <List>
          {config &&
            Object.keys(config).map(e => (
              <List.Item>
                <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>{e}</p>
                  {
                    //@ts-ignore
                    <p>{config[e]}</p>
                  }
                  <p>
                    <EditOutlined />
                  </p>
                </div>
              </List.Item>
            ))}
        </List>
      </Modal>
    </>
  )
}

export default ModalConfig
