import { Translations } from '@/i18n/types'
import { deleteTemporalQRFn } from '@/services/workers'
import { IWorker } from '@/types/types'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal, Tooltip } from 'antd'
import React from 'react'

const DeleteTemporalQR = ({ translations, worker, reload }: { translations: Translations; worker: IWorker; reload: () => void }) => {
  //   const [visible, setVisible] = useState(false)
  //   const { theme } = useContext(ThemeContext)
  const deleteCode = async () => {
    try {
      await deleteTemporalQRFn(worker._id as string)
      reload()
    } catch (error) {
      message.error('Ocurrio un error')
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: translations.confirmDeleteQR,

      onOk: deleteCode
    })
  }

  return (
    <>
      <Tooltip title={translations.deleteQR}>
        <Button
          style={{ margin: '5px', fontSize: '20px', color: 'tomato' }}
          key={2}
          shape="circle"
          onClick={confirmDelete}
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </>
  )
}

export default React.memo(DeleteTemporalQR)
