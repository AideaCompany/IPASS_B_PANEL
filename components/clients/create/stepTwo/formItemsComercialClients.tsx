import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsComercialClients } from './formElementsComercialClients'

const FormItemsComercialClients = (props: { translations: ITranslations; isUpdate?: boolean }): JSX.Element => {
  const { translations, isUpdate } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElementsComercialClients()} />}
    </div>
  )
}
export default FormItemsComercialClients
