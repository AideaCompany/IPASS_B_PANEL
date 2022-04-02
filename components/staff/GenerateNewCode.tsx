import { ITranslations } from '@/i18n/types'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ReloadOutlined } from '@ant-design/icons'
import { Button, message, Tooltip } from 'antd'
import React from 'react'

const GenerateNewCode = ({ translations, reload }: { translations: ITranslations; staff: IStaff; reload: () => void; isTemporal: boolean }) => {
  //   const [visible, setVisible] = useState(false)
  //   const { theme } = useContext(ThemeContext)
  const generateNewCode = () => {
    try {
      // if (isTemporal) {
      //   await generateNewTemporalQRFn(worker._id)
      // } else {
      //   await generateNewPermanentQRFn(worker._id)
      // }
      reload()
    } catch (error) {
      message.error('Ocurrió un error')
    }
  }
  return (
    <>
      <Tooltip title={translations.generateNewCode}>
        <Button style={{ margin: '5px', fontSize: '20px' }} key={2} shape="circle" onClick={generateNewCode} icon={<ReloadOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(GenerateNewCode)
