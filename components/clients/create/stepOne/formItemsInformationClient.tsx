import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsInformationClient } from './formElementsinformationClient'

const FormItemsInformationClient = (props: { translations: ITranslations; isUpdate?: boolean; inicialData?: any }): JSX.Element => {
  const { translations, isUpdate, inicialData } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElementsInformationClient(inicialData)} />}
    </div>
  )
}
export default FormItemsInformationClient
