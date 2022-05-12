import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsGeneralInformation } from './formElementsGeneralInformation'

const FormGeneralInformation = (props: { translate: ITranslations; isUpdate?: boolean; dataProducts?: IProduct[] }): JSX.Element => {
  const { translate, isUpdate, dataProducts } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElementsGeneralInformation(dataProducts, [])} />}
    </div>
  )
}
export default FormGeneralInformation
