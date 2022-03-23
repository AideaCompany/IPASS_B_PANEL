//react
//Components
import BarChart from '@/components/board/BarChart'
import BarLocations from '@/components/board/BarLocations'
import CardBoard from '@/components/board/CardBoard'
import ExternalEventsBar from '@/components/board/ExternalEventsBar'
import PieChartComp from '@/components/board/PieChart'
import MainLayout from '@/components/layout/Layout'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { generalAnalythicsFn } from '@/services/analythics'
import { analythicsAttemptsByLocationFn, analythicsAttemptsFn } from '@/services/locationAttempts'
import { iAttemptsByLocation, iGeneralAnalythics, iLocationAttemptAnalythics, PermissionsPrivilege } from '@/types/types'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

// interface actualItem extends IBreach {}ø

const board = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()

  //#region cards

  const [dataAnalythics, setDataAnalythics] = useState<iLocationAttemptAnalythics>()
  const [dataAnalythicsByLocation, setDataAnalythicsByLocation] = useState<iAttemptsByLocation[]>([])
  const [generalAnalythics, setGeneralAnalythics] = useState<iGeneralAnalythics>()
  //#endregion cards

  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Board'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
        const interval = setInterval(() => {
          getData()
        }, 30000)
        return () => clearInterval(interval)
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setGeneralAnalythics(await generalAnalythicsFn())
    setDataAnalythics(await analythicsAttemptsFn())
    setDataAnalythicsByLocation(await analythicsAttemptsByLocationFn())
    // setData(await getAllBreach2Days())
  }

  const onChangeDate = async (date: number) => {
    setDataAnalythicsByLocation(await analythicsAttemptsByLocationFn(date))
  }

  // const [vt] = useVT(() => ({ scroll: { y: 1000 }, debug: false }))

  return (
    <>
      <MainLayout hideButtons={true} getData={getData} lang={lang} title={localization?.translations.titleSection} notShowHeader={true}>
        <>
          {generalAnalythics && <CardBoard generalAnalythics={generalAnalythics} />}

          <div style={{ marginBottom: 20 }} className="main_container_bars">
            <BarLocations onChangeDate={onChangeDate} dataAnalythicsByLocation={dataAnalythicsByLocation} />
          </div>
          <div className="main_container_bars">
            {dataAnalythics && (
              <>
                <BarChart dataCumpIncp={dataAnalythics?.dataCumpIncp} />
                <ExternalEventsBar dataEvents={dataAnalythics.dataEvents} />
              </>
            )}
          </div>
          <PieChartComp />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(board)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'board')
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
