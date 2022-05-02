import { ITranslations } from '@/i18n/types'
import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current, translate }: { current: number; translate: ITranslations }) => {
  return (
    <Steps style={{ height: '100%' }} current={current}>
      <Steps.Step title={translate.generalInformation} />
      <Steps.Step title={translate.photoUpload} />
      <Steps.Step title={translate.storageInformation} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
