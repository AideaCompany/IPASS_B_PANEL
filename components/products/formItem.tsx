import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; brands: IBrands[]; services: IService[] }): JSX.Element => {
  const { translations, isUpdate, brands, services } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(services, brands)} />}
    </div>
  )
}
export default FormItems
