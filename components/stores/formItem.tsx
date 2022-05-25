<<<<<<< HEAD
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { iTimeZone } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: Translations; isUpdate?: boolean; timeZone: iTimeZone[] }): JSX.Element => {
  const { translations, isUpdate, timeZone } = props
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'

import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; timeZone: ITimeZone[]; services: IService[] }): JSX.Element => {
  const { translations, isUpdate, timeZone, services } = props
>>>>>>> dev
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
<<<<<<< HEAD
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(timeZone)} />}
=======
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(timeZone, services)} />}
>>>>>>> dev
    </div>
  )
}
export default FormItems
