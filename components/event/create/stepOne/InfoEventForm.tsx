import FormFactory from '@/components/crudFunctions/FormFactory'
import { Translations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { getAllLocationActive } from '@/services/locations'
import { ILocation } from '@/types/types'
import React, { useContext, useEffect, useState } from 'react'
import { formElements } from './formElements'

const InfoEventForm = ({ translate, validate }: { translate: Translations; validate: () => void }) => {
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()
  // const { validate } = useLocation()
  const [locations, setLocations] = useState<ILocation[]>([])
  const getFormElements = () => {
    switch (permission.name) {
      case 'Super_admin':
        return formElements(locations)
      default:
        return formElements(locations)
    }
  }

  useEffect(() => {
    validate()
    getData()
  }, [])

  const getData = async () => {
    const locations = await getAllLocationActive()
    setLocations(locations)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <FormFactory isUpdate={true} formElements={getFormElements()} theme={theme} translate={translate} />
    </div>
  )
}

export default React.memo(InfoEventForm)
