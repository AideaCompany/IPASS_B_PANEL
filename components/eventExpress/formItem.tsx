import { useContext } from 'react'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import FormFactory from '../crudFunctions/FormFactory'
import { IContact, ILocation } from '@/types/types'
import { formElements } from './formElements'

const FormItems = (props: { translations: Translations; isUpdate?: boolean; locations: ILocation[]; contacts: IContact[] }): JSX.Element => {
  const { translations, isUpdate, locations, contacts } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(locations, contacts)} />}
    </div>
  )
}
export default FormItems
