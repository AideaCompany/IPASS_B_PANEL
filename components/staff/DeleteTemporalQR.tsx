import { ITranslations } from '@/i18n/types'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal, Tooltip } from 'antd'
import React from 'react'

const DeleteTemporalQR = ({ translations, reload }: { translations: ITranslations; staff: IStaff; reload: () => void }) => {
  //   const [visible, setVisible] = useState(false)
  //   const { theme } = useContext(ThemeContext)
  const deleteCode = () => {
    try {
      // await deleteTemporalQRFn(worker._id)
      reload()
    } catch (error) {
      message.error('Ocurrió un error')
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
