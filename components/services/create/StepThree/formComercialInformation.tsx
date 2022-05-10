import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsComercialInformation } from './formElementsComercialInformation'

const FormComercialInformation = (props: { translate: ITranslations; isUpdate?: boolean }): JSX.Element => {
  const { translate, isUpdate } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElementsComercialInformation()} />}
    </div>
  )
}
export default FormComercialInformation
