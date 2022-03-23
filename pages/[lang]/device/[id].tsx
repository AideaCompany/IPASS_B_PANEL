import MainLayout from '@/components/layout/Layout'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getDeviceById } from '@/services/device'
import { IDevice } from '@/types/types'
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Localization } from 'i18n/types'
import { GetServerSidePropsContext } from 'next'
import React from 'react'

const Device = (props: { localization: Localization; lang: string; device: IDevice }) => {
  const { lang, device, localization } = props
  const { translations } = localization
  return (
    <MainLayout hideButtons={true} lang={lang} title={translations.titleDevice + ': ' + device.name}>
      <div className="infoContainer">
        <div className="infoDeviceContainer">
          <h2>{translations.infoDevice}</h2>
          <div className="propsContainer">
            {Object.keys(device).map((key: any) => {
              if (key !== 'actualLocation' && key !== '_id') {
                if (key === 'enableVideo' || key === 'enableTalk') {
                  return (
                    <div className="propDevice">
                      <span>{translations[key]}:</span>
                      <p>
                        {device[key as keyof IDevice] ? (
                          <CheckCircleFilled style={{ color: 'rgba(35, 203, 167, 1)' }} />
                        ) : (
                          <CloseCircleFilled style={{ color: 'rgba(207, 0, 15,1)' }} />
                        )}
                      </p>
                    </div>
                  )
                }
                return (
                  <div className="propDevice">
                    <span>{translations[key]}:</span>
                    <p>{device[key as keyof IDevice]}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
        {device.actualLocation ? (
          <div className="infoLocationContainer">
            <h2>{translations.infoLocation}</h2>
            <div className="propsContainer">
              <div className="propDevice">
                <span>{translations.name}:</span>
                <p>{device.actualLocation.name}</p>
              </div>
              <div className="propDevice">
                <span>{translations.address}:</span>
                <p>{device.actualLocation.address}</p>
              </div>
              <div className="propDevice">
                <span>{translations.state}:</span>
                <p>{device.actualLocation.state}</p>
              </div>
              <div className="propDevice">
                <span>{translations.typeCheck}:</span>
                <p>{device.actualLocation.typeCheck}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="notLocation">
            <h2>{translations.notLocation}</h2>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default React.memo(Device)
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'device')
  const device = await getDeviceById(ctx.query.id as string)
  if (!device) {
    return {
      notFound: true
    }
  }
  return { props: { localization, device } }
}
