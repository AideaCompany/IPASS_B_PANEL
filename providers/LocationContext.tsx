import { getAllLocationActive } from '@/services/locations'
import { getUsersAdminFn } from '@/services/users'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { FormInstance } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

type LocationContextType = {
  admins: IUser[]
  locations: ILocation[]
  data: ILocation | undefined
  formRef: React.Ref<FormInstance>
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  validate: () => void
}

const LocationContext = React.createContext<LocationContextType>({} as LocationContextType)

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
  const [admins, setAdmins] = useState<IUser[]>([])
  const [locations, setLocations] = useState<ILocation[]>([])

  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    const admin = await getUsersAdminFn()
    const location = await getAllLocationActive()
    setAdmins(admin)
    setLocations(location)
  }
  return <LocationContext.Provider value={{ validate, admins, locations, data, formRef, setDisabled }}>{children}</LocationContext.Provider>
}

const useLocation = () => {
  return useContext(LocationContext)
}
export default useLocation
