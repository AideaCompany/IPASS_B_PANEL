import FormFactory from '@/components/crudFunctions/FormFactory'
import { ITranslations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import useLocation from '@/providers/LocationContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { getAvailableDevices } from '@/services/device'
import { IDevice } from '@/types/interfaces/Device/Device.interface'

import React, { useContext, useEffect, useState } from 'react'
import { formElementsSuperAdmin } from './formElementsSuperAdmin'

const InfoLocationForm = ({ translate }: { translate: ITranslations }) => {
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()
  const { validate } = useLocation()
  const [devices, setDevices] = useState<IDevice[]>([])
  const getFormElements = () => {
    switch (permission.name) {
      case 'Super_admin':
        return formElementsSuperAdmin(devices)
      default:
        return formElementsSuperAdmin(devices)
    }
  }

  useEffect(() => {
    validate()
    getData()
  }, [])

  const getData = async () => {
    const newDevices = await getAvailableDevices()
    setDevices(newDevices)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <FormFactory isUpdate={true} formElements={getFormElements()} theme={theme} translate={translate} />
    </div>
  )
}

export default InfoLocationForm
