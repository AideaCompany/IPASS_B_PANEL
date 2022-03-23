import GuestsEventForm from '@/components/event/create/stepTwo/GuestsEventForm'
import MainLayout from '@/components/layout/Layout'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getEventFn } from '@/services/events'
import { createInvitation } from '@/services/invitationEvent'
import { Button, Form, FormInstance, message } from 'antd'
import { Localization } from 'i18n/types'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

const EventGuests = (props: { localization: Localization; lang: string }) => {
  const { localization, lang } = props

  const formRef = useRef<FormInstance>(null)

  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const validateForm = async () => {
    formRef.current
      ?.validateFields()
      .then(() => {
        setError('')
        setDisabled(false)
      })
      .catch(async (error: any) => {
        if (error.errorFields.length > 0) {
          if (error.errorFields[0].name.find((name: string) => name === 'admins')) {
            setError(localization.translations.selectMinimumAdmin)
            setDisabled(true)
          } else {
            setError(localization.translations.allFieldsAreRequired)
            setDisabled(true)
          }
        } else {
          setError('')
          setDisabled(false)
        }
      })
  }
  const onFinish = async (value: any) => {
    if (value.guests) {
      value.guests.map(async (contactId: string) => {
        //@ts-ignore
        await createInvitation({ event: router.query.id as string, contact: contactId as string, confirmed: false, alreadySendInvitation: false })
      })
    }

    message.success('Invitados añadidos con éxito!')
  }
  return (
    <MainLayout hideButtons={true} lang={lang} title={localization?.translations.titleModalGuests}>
      <Form name="test" onValuesChange={validateForm} /* component={false}  */ ref={formRef} onFinish={onFinish}>
        {error && <div className="error">{error}</div>}
        <GuestsEventForm translate={localization.translations} setDisabled={setDisabled} />
        <Form.Item>
          <Button disabled={disabled} type="primary" shape="round" htmlType="submit">
            {localization.translations.titleModalGuests}
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  )
}

export default React.memo(EventGuests)
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'event')
  const event = await getEventFn(ctx.query.id as string)
  if (!event) {
    return {
      notFound: true
    }
  }
  return { props: { localization } }
}
