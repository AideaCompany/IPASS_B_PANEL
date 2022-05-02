import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { IService } from '@/types/types'

import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; timeZone: ITimeZone[]; services: IService[] }): JSX.Element => {
  const { translations, isUpdate, timeZone, services } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(timeZone, services)} />}
    </div>
  )
}
export default FormItems
