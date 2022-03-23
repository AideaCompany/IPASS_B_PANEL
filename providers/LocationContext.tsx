import { getAllLocationActive } from '@/services/locations'
import { getUsersAdminFn } from '@/services/users'
import { FormInstance } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ILocation, User } from '../types/types'
type LocationContext = {
  admins: User[]
  locations: ILocation[]
  data: ILocation | undefined
  formRef: React.Ref<FormInstance>
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  validate: () => void
}

const LocationContext = React.createContext<LocationContext>({} as LocationContext)

export const LocationProvider = (props: {
  children: JSX.Element
  data: ILocation | undefined
  formRef: React.Ref<FormInstance>
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  validate: () => void
}) => {
  //props
  const { children, data, formRef, setDisabled, validate } = props

  //states
  const [admins, setAdmins] = useState<User[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    const admins = await getUsersAdminFn()
    const location = await getAllLocationActive()
    setAdmins(admins)
    setLocations(location)
  }
  return <LocationContext.Provider value={{ validate, admins, locations, data, formRef, setDisabled }}>{children}</LocationContext.Provider>
}

export default function useLocation() {
  return useContext(LocationContext)
}
