import ManagePermission from '@/components/location/view/ManagePermission'
import { Localization } from '@/i18n/types'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { LocationViewProvider } from '@/providers/ViewLocationContext'
import { getLocationFn } from '@/services/locations'
import { ILocation, User } from '@/types/types'
import { GetServerSidePropsContext } from 'next'
import React from 'react'
const viewLocation = ({ lang, localization, location }: { lang: string; localization: Localization; location: ILocation }) => {
  return (
    <LocationViewProvider translate={localization.translations} lang={lang} location={location}>
      <ManagePermission />
    </LocationViewProvider>
  )
}

export default viewLocation
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const localization = getLocalizationProps(ctx, 'location')
  const location = await getLocationFn(ctx.query.id as string)
  if (!location) {
    return {
      notFound: true
    }
  }
  const newLocation: ILocation = JSON.parse(JSON.stringify(location))
  newLocation.admins = (location.admins as User[])?.map(admin => admin?._id).filter(e => e)
  newLocation.parentLocations = (location.parentLocations as ILocation[])?.map(parentLocation => parentLocation?._id)
  newLocation.childLocations = (location.childLocations as ILocation[])?.map(childLocation => childLocation?._id)
  return { props: { localization, location: newLocation } }
}
