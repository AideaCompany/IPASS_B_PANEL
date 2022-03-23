//Provider
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getinvitation, updateInvitation } from '@/services/invitationEvent'
import { IEvent, IInvitationEvent } from '@/types/types'
import { typeQr } from '@/types/valuesAddQr'
import { getTime } from '@/utils/utils'
import { CalendarOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
//Next
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import QrCode from 'qrcode.react'
import React, { useEffect, useState } from 'react'

const confirmEvent = () => {
  const [content, setcontent] = useState<JSX.Element>(<></>)
  const router = useRouter()
  const [loading, setloading] = useState<boolean>(true)
  useEffect(() => {
    ;(async () => {
      if (router.query.id) {
        const eventActual: IInvitationEvent = JSON.parse(JSON.stringify(await getinvitation(router.query.id as string)))
        if (router.query.confirm === 'true') {
          //@ts-ignore
          await updateInvitation({ _id: eventActual._id as string, confirmed: true })
          setcontent(showQRElemnt(eventActual))
        } else {
          //@ts-ignore
          await updateInvitation({ _id: eventActual._id as string, confirmed: false })
          setcontent(showSorry())
        }
        setloading(false)
      }
    })()
  }, [router.query.id])

  const drawBackground = (elem: HTMLImageElement) => {
    // create a new canvas
    var c = document.createElement('canvas')
    // set its width&height to the required ones
    // draw our canvas to the new one
    c.height = elem.height + 9
    c.width = elem.width + 9
    const ctx = c.getContext('2d') as CanvasRenderingContext2D
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, elem.width + 9, elem.height + 9)

    ctx.drawImage(elem, 0, 0, elem.width + 9, elem.height + 9, 7, 7, elem.width, elem.height)
    // return the resized canvas dataURL
    return c.toDataURL('image/jpeg')
  }

  const download = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement
    // const imageData = canvas.toDataURL('image/jpeg').toString()
    const img = new Image()
    img.src = canvas.toDataURL('image/jpeg')
    img.onload = () => {
      const imageData = drawBackground(img)
      const downloadLink = document.createElement('a')
      downloadLink.href = imageData
      downloadLink.download = 'qr_invitado.jpeg'
      downloadLink.click()
    }
  }
  const showSorry = (): JSX.Element => (
    <div className="confirmContainer">
      <h1>Lamentamos mucho que no puedas asistir.</h1>
    </div>
  )

  const showQRElemnt = (actualInvitation: IInvitationEvent): JSX.Element => {
    if (actualInvitation.contact) {
      if (actualInvitation.confirmed) {
        return (
          <div className="confirmContainer">
            <h1>{`Evento: ${(actualInvitation.event as IEvent).name}`}</h1>
            <h3>{`La reunión con ${(actualInvitation.event as IEvent)?.host?.name} ${(actualInvitation.event as IEvent)?.host?.lastname}`}</h3>
            <div className="calendar">
              <p>{`Desde:`}</p> <CalendarOutlined /> <p>{`${getTime((actualInvitation.event as IEvent)?.start)}`}</p>
            </div>
            <div className="calendar">
              <p>{`Hasta:`}</p> <CalendarOutlined /> <p>{`${getTime((actualInvitation.event as IEvent)?.end)}`}</p>
            </div>
            <p>{`Te esperamos en :${(actualInvitation.event as IEvent)?.location.address}`}</p>
            <QrCode value={`${typeQr.event}-${actualInvitation._id}`} size={300} level={'M'} />

            <Button type="primary" onClick={download} style={{ margin: '10px' }}>
              Descargar
            </Button>
          </div>
        )
      } else {
        return (
          <div className="confirmContainer">
            <h1>{`Evento confirmado: ${(actualInvitation.event as IEvent).name}`}</h1>
            <h3>{`La reunión con ${(actualInvitation.event as IEvent)?.host?.name} ${(actualInvitation.event as IEvent)?.host?.lastname}`}</h3>
            <div className="calendar">
              <p>{`Desde:`}</p> <CalendarOutlined /> <p>{`${getTime((actualInvitation.event as IEvent)?.start)}`}</p>
            </div>
            <div className="calendar">
              <p>{`Hasta:`}</p> <CalendarOutlined /> <p>{`${getTime((actualInvitation.event as IEvent)?.end)}`}</p>
            </div>
            <p>{`Te esperamos en :${(actualInvitation.event as IEvent)?.location.address}`}</p>
            <QrCode value={`${typeQr.event}-${actualInvitation._id}`} size={300} level={'M'} />

            <Button type="primary" onClick={download} style={{ margin: '10px' }}>
              Descargar
            </Button>
            <h2>Gracias por confirmar</h2>
          </div>
        )
      }
    } else {
      return <h3>Invitado no encontrado</h3>
    }
  }

  return loading ? (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center' }}>
      <Spin />
    </div>
  ) : (
    <>{content}</>
  )
}

export default confirmEvent
export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'confirmEvent')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
