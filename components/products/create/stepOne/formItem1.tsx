import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElements1 } from './formElements1'

const FormItems1 = (props: { translate: ITranslations; isUpdate?: boolean; brands: IBrands[] }): JSX.Element => {
  const { translate, isUpdate, brands } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElements1(brands)} />}
    </div>
  )
}
export default FormItems1
