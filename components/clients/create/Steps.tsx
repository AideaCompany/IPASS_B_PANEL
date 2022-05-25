import { ITranslations } from '@/i18n/types'
import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current, translate }: { current: number; translate: ITranslations }) => {
  return (
    <Steps style={{ height: '100%' }} current={current}>
      <Steps.Step title={translate.informationClient} />
      <Steps.Step title={translate.comercialClient} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
