import React, { useContext } from 'react'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import FormFactory from '../crudFunctions/FormFactory'

import { formElements } from './formElements'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IUser } from '@/types/interfaces/user/User.interface'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; locations: ILocation[]; admins: IUser[] }): JSX.Element => {
  const { translations, isUpdate, locations } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(locations)} />}
    </div>
  )
}
export default FormItems
