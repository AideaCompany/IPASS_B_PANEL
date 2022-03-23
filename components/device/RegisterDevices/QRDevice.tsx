import Qr from '@/components/Qr'
import { Translations } from '@/i18n/types'
import { IDevice } from '@/types/types'
import { download_qr } from '@/utils/QR_utils'
import { CommonPropsModal } from '@/utils/utils'
import { DownloadOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'

const QRDevice = ({ device, translations }: { device: IDevice; translations: Translations }) => {
  //#region  states
  const [visible, setVisible] = useState(false)
  //#endregion states

  //#region functions
  const handleClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Modal {...CommonPropsModal} visible={visible} onCancel={handleClose} width={400}>
        <div style={{ flexDirection: 'column' }} className="flex">
          <Qr id={'permanent'} value={`https://renap.ipass.com.gt/device/${device._id}`} />
          {/* <Qr id={'permanent'} value={`http://localhost:3000/device/${device._id}`} /> */}

          <Button shape="round" onClick={() => download_qr('permanent', `qr_${device._id}`)} icon={<DownloadOutlined />}>
            {translations.downloadRegisterQR}
          </Button>
        </div>
      </Modal>
      <Tooltip title={translations.downloadRegisterQR}>
        <Button style={{ marginRight: 5 }} onClick={() => setVisible(true)} shape="circle" icon={<QrcodeOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(QRDevice)
