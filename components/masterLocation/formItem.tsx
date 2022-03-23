import { useContext } from 'react'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'
import { ILocation } from '@/types/types'

const FormItems = (props: { translations: Translations; isUpdate?: boolean; locations: ILocation[] }): JSX.Element => {
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
