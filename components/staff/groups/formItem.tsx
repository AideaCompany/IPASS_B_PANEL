import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation } from '@/types/interfaces/Location/Location.interface'

import React, { useContext } from 'react'
import FormFactory from '../../crudFunctions/FormFactory'
import { formElements } from './formElements'
const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; location: ILocation[] }): JSX.Element => {
  const { translations, isUpdate, location } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElements(location)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItems
