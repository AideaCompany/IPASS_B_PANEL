import FormFactory from '@/components/crudFunctions/FormFactory'
import { Translations } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { ThemeContext } from '@/providers/ThemeContext'
import React, { useContext, useEffect } from 'react'
import { formElements } from '../formElements'

const DeviceForm = ({ translate, validate }: { translate: Translations; validate: () => void }) => {
  const { theme } = useContext(ThemeContext)
  const { permission } = useAuth()

  const getFormElements = () => {
    switch (permission.name) {
      case 'Super_admin':
        return formElements()
      default:
        return formElements()
    }
  }

  useEffect(() => {
    validate()
  }, [])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <FormFactory isUpdate={false} formElements={getFormElements()} theme={theme} translate={translate} />
    </div>
  )
}

export default React.memo(DeviceForm)
