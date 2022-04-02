import { ITranslations } from '@/i18n/types'
import { getAvailableDevices } from '@/services/device'
import { getAllLocationActive } from '@/services/locations'
import { getUsersAdminFn } from '@/services/users'
import { IDevice } from '@/types/interfaces/Device/Device.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import React, { useContext, useEffect, useState } from 'react'

type LocationViewContextType = {
  admins: IUser[]
  locations: ILocation[]
  devices: IDevice[]
  actualLocation: ILocation
  setActualLocation: React.Dispatch<React.SetStateAction<ILocation>>
  translate: ITranslations
  lang: string
}

const LocationViewContext = React.createContext<LocationViewContextType>({} as LocationViewContextType)

export const LocationViewProvider = (props: { children: JSX.Element; location: ILocation; translate: ITranslations; lang: string }) => {
  //props
  const { children, location, translate, lang } = props
  //states
  const [admins, setAdmins] = useState<IUser[]>([])
  const [devices, setDevices] = useState<IDevice[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])
  const [actualLocation, setActualLocation] = useState<ILocation>(location)

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    const foundAdmins = await getUsersAdminFn()
    const foundLocations = await getAllLocationActive()
    const foundDevices = await getAvailableDevices()

    let dev_actual
    if (location.device) {
      dev_actual = [...foundDevices, location.device]
    } else {
      dev_actual = [...foundDevices]
    }
    setAdmins(foundAdmins)
    setLocations(foundLocations)
    setDevices(dev_actual)
  }

  return (
    <LocationViewContext.Provider value={{ admins, setActualLocation, locations, actualLocation, translate, lang, devices }}>
      {children}
    </LocationViewContext.Provider>
  )
}

const useLocationView = () => {
  return useContext(LocationViewContext)
}

export default useLocationView
