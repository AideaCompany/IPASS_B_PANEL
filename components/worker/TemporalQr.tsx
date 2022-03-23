import { Translations } from '@/i18n/types'
import { IWorker, IWorker_qr_temporal } from '@/types/types'
import { download_qr } from '@/utils/QR_utils'
import { DownloadOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React from 'react'
import Qr from '../Qr'
import DeleteTemporalQR from './DeleteTemporalQR'
import GenerateNewCode from './GenerateNewCode'
const temporalQr = ({ translations, worker, reload }: { translations: Translations; worker: IWorker; reload: () => void }) => {
  const isValid = worker.temporal_Qr ? (!worker.temporal_Qr.used ? (worker.temporal_Qr.valid ? true : false) : false) : false
  return (
    <div className={'parent_QR'}>
      <Qr hasMask={!isValid} value={isValid ? (worker.temporal_Qr as IWorker_qr_temporal).QR : 'No data'} id={'temporal'} />
      <div className={'control_info_QR'}>
        <div className={'temporal_info'}>
          <h3>{`${translations.temporalCode}`}</h3>
          <Tooltip title={translations.download}>
            <Button
              style={{ margin: '5px', fontSize: '20px' }}
              key={2}
              shape="circle"
              disabled={!isValid}
              onClick={() => download_qr('temporal', `temporal_${worker.name}_${worker.lastname}`)}
              icon={<DownloadOutlined />}
            />
          </Tooltip>
          <GenerateNewCode isTemporal reload={reload} worker={worker} translations={translations} />
          <DeleteTemporalQR reload={reload} worker={worker} translations={translations} />
        </div>
        {/* <div className={'qr_time'}>
          <p>{`${translations.remainingTime}: ${worker.temporal_Qr ? moment(worker.temporal_Qr.timeEnd).fromNow() : '00:00:00'}`}</p>
        </div> */}
      </div>
    </div>
  )
}

export default React.memo(temporalQr)
