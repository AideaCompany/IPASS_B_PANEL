import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IWorker } from '@/types/types'
import { typeQr } from '@/types/valuesAddQr'
import { download_qr } from '@/utils/QR_utils'
import { DownloadOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Modal, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import Qr from '../Qr'
import GenerateNewCode from './GenerateNewCode'

const QRWorker = ({ translations, worker, reload }: { translations: Translations; worker: IWorker; reload: () => void }) => {
  const [visible, setVisible] = useState(false)
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <Modal className={`modalCrud${theme}`} width={'50vw'} visible={visible} onCancel={() => setVisible(false)} destroyOnClose>
        <div className={'worker_QR_modal'}>
          <h3>{`${translations.qr} ${worker.name} ${worker.lastname}`}</h3>
          <div className={'container_QR'}>
            <div className={'parent_QR'}>
              <Qr id={'permanent'} value={`${typeQr.worker}-${worker.QR}`} />
              <div className={'control_QR'}>
                <h3>{`${translations.permanentCode}`}</h3>
                <Tooltip title={translations.download}>
                  <Button
                    style={{ margin: '5px', fontSize: '20px' }}
                    key={2}
                    shape="circle"
                    onClick={() => download_qr('permanent', `qr_${worker.name}_${worker.lastname}`)}
                    icon={<DownloadOutlined />}
                  />
                </Tooltip>
                <GenerateNewCode isTemporal={false} reload={reload} worker={worker} translations={translations} />
              </div>
            </div>
            {/* <TemporalQr reload={reload} translations={translations} worker={worker} /> */}
          </div>
        </div>
      </Modal>
      <Tooltip placement="top" title={translations.qr}>
        <QrcodeOutlined onClick={() => setVisible(true)} style={{ paddingLeft: '5px', fontSize: '18px' }} />
      </Tooltip>
    </>
  )
}

export default React.memo(QRWorker)
