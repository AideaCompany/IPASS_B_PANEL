import { Translations } from '@/i18n/types'
import { getAvailableDevices } from '@/services/device'
import { getAllLocationActive } from '@/services/locations'
import { getUsersAdminFn } from '@/services/users'
import React, { useContext, useEffect, useState } from 'react'
import { IDevice, ILocation, User } from '../types/types'
type LocationViewContext = {
  admins: User[]
  locations: ILocation[]
  devices: IDevice[]
  actualLocation: ILocation
  setActualLocation: React.Dispatch<React.SetStateAction<ILocation>>
  translate: Translations
  lang: string
}

const LocationViewContext = React.createContext<LocationViewContext>({} as LocationViewContext)

export const LocationViewProvider = (props: { children: JSX.Element; location: ILocation; translate: Translations; lang: string }) => {
  //props
  const { children, location, translate, lang } = props
  //states
  const [admins, setAdmins] = useState<User[]>([])
  const [devices, setDevices] = useState<IDevice[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])
  const [actualLocation, setActualLocation] = useState<ILocation>(location)

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    const admins = await getUsersAdminFn()
    const locations = await getAllLocationActive()
    const devices = await getAvailableDevices()

    var dev_actual
    if (location.device) {
      dev_actual = [...devices, location.device]
    } else {
      dev_actual = [...devices]
    }
    setAdmins(admins)
    setLocations(locations)
    setDevices(dev_actual)
  }

  return (
    <LocationViewContext.Provider value={{ admins, setActualLocation, locations, actualLocation, translate, lang, devices }}>
      {children}
    </LocationViewContext.Provider>
  )
}

export default function useLocationView() {
  return useContext(LocationViewContext)
}
