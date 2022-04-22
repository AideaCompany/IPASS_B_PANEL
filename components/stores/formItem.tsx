import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { iTimeZone } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: Translations; isUpdate?: boolean; timeZone: iTimeZone[] }): JSX.Element => {
  const { translations, isUpdate, timeZone } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(timeZone)} />}
    </div>
  )
}
export default FormItems
