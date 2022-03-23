import { Translations } from '@/i18n/types'
import { Steps } from 'antd'
import React from 'react'

const StepsEncuesta = ({ current, translate }: { current: number; translate: Translations }) => {
  return (
    <Steps style={{ height: '100%' }} current={current}>
      <Steps.Step title={translate.eventInfo} />
      <Steps.Step title={translate.selectGuests} />
    </Steps>
  )
}

export default React.memo(StepsEncuesta)
