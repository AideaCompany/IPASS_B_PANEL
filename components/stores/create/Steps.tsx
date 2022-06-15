import { ITranslations } from '@/i18n/types'
import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current, translate }: { current: number; translate: ITranslations }) => {
  return (
    <Steps style={{ height: '100%' }} current={current}>
      <Steps.Step title={translate.selectLocation} />
      <Steps.Step title={translate.generalInfo} />
      <Steps.Step title={translate.services} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
