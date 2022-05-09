import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsResources } from './formElementsResources'

const FormResources = (props: {
  translate: ITranslations
  isUpdate?: boolean
  dataServiceType: IServiceType[] | undefined
  dataProducts: IProduct[] | undefined
  subServices: ISubService[]
}): JSX.Element => {
  const { translate, isUpdate, dataServiceType, dataProducts, subServices } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const staff: IStaff[] = []
  const stores: IStores[] = []
  return (
    <div className="formContainer">
      {
        <FormFactory
          translate={translate}
          isUpdate={updating}
          theme={theme}
          formElements={formElementsResources(dataServiceType, dataProducts, staff, stores, subServices)}
        />
      }
    </div>
  )
}
export default FormResources
