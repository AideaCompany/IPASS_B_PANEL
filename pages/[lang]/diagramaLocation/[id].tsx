import React from 'react'
import dynamic from 'next/dynamic'
import MainLayout from '@/components/layout/Layout'
import { getLocationsByMasterFn } from '@/services/locations'
import { GetServerSidePropsContext } from 'next'

import { getMasterLocationFn } from '@/services/masterLocations'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IMasterLocation } from '@/types/interfaces/MasterLocation/MasterLocation.interface'

const DynamicComponentWithNoSSR = dynamic(() => import('../../../components/DiagramaLocation'), { ssr: false })

const index = ({ locations, masterLocation }: { locations: ILocation[]; masterLocation: IMasterLocation }) => {
  return (
    <MainLayout lang="lang" title={`Diagrama de locación master: ${masterLocation?.name}`}>
      <DynamicComponentWithNoSSR masterLocation={masterLocation} locations={locations} />
    </MainLayout>
  )
}

export default index

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locations = await getLocationsByMasterFn(ctx.query.id as string)
  const masterLocation = await getMasterLocationFn(ctx.query.id as string)
  if (!locations || !masterLocation) {
    return {
      notFound: true
    }
  }
  return { props: { locations, masterLocation } }
}
