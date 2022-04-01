import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IProduct, IServiceType } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: {
  translations: Translations
  isUpdate?: boolean
  dataServiceType: IServiceType[] | undefined
  dataProducts: IProduct[] | undefined
}): JSX.Element => {
  const { translations, isUpdate, dataServiceType, dataProducts } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(dataServiceType, dataProducts)} />}
    </div>
  )
}
export default FormItems
