import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ISubService } from '@/types/interfaces/SubServices/SubServices.interface'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsComplements } from './formElementsComplements'

const FormComplements = (props: { translate: ITranslations; isUpdate?: boolean; stores: IStores[]; subServices: ISubService[] }): JSX.Element => {
  const { translate, isUpdate, stores, subServices } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElementsComplements(stores, subServices)} />}
    </div>
  )
}
export default FormComplements
