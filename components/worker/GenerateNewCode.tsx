import { Translations } from '@/i18n/types'
import { generateNewPermanentQRFn, generateNewTemporalQRFn } from '@/services/workers'
import { IWorker } from '@/types/types'
import { ReloadOutlined } from '@ant-design/icons'
import { Button, message, Tooltip } from 'antd'
import React from 'react'

const GenerateNewCode = ({
  translations,
  worker,
  reload,
  isTemporal
}: {
  translations: Translations
  worker: IWorker
  reload: () => void
  isTemporal: boolean
}) => {
  //   const [visible, setVisible] = useState(false)
  //   const { theme } = useContext(ThemeContext)
  const generateNewCode = async () => {
    try {
      if (isTemporal) {
        await generateNewTemporalQRFn(worker._id as string)
      } else {
        await generateNewPermanentQRFn(worker._id as string)
      }
      reload()
    } catch (error) {
      message.error('Ocurrio un error')
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
