import { ITranslations } from '@/i18n/types'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { download_qr } from '@/utils/QR_utils'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import Qr from '../Qr'
import DeleteTemporalQR from './DeleteTemporalQR'
import GenerateNewCode from './GenerateNewCode'
const temporalQr = ({ translations, staff, reload }: { translations: ITranslations; staff: IStaff; reload: () => void }) => {
  const isValid = true
  return (
    <div className={'parent_QR'}>
      <Qr hasMask={!isValid} value={isValid ? ' ' : 'No data'} id={'temporal'} />
      <div className={'control_info_QR'}>
        <div className={'temporal_info'}>
          <h3>{`${translations.temporalCode}`}</h3>
          <Tooltip title={translations.download}>
            <Button
              style={{ margin: '5px', fontSize: '20px' }}
              key={2}
              shape="circle"
              disabled={!isValid}
              onClick={() => download_qr('temporal', `temporal_${staff.name as string}_${staff.lastName}`)}
              icon={<DownloadOutlined />}
            />
          </Tooltip>
          <GenerateNewCode isTemporal reload={reload} staff={staff} translations={translations} />
          <DeleteTemporalQR reload={reload} staff={staff} translations={translations} />
        </div>
        {/* <div className={'qr_time'}>
          <p>{`${translations.remainingTime}: ${worker.temporal_Qr ? moment(worker.temporal_Qr.timeEnd).fromNow() : '00:00:00'}`}</p>
        </div> */}
      </div>
    </div>
  )
}

export default React.memo(temporalQr)
