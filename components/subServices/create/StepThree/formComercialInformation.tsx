import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'

import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsComercialInformation } from './formElementsComercialInformation'

const FormComercialInformation = (props: {
  translate: ITranslations
  isUpdate?: boolean
  dataServiceType?: IServiceType[]
  dataProducts?: IProduct[]
  staff: IStaff[]
  stores: IStores[]
  subServices: ISubService[]
}): JSX.Element => {
  const { translate, isUpdate, dataServiceType, dataProducts, staff, stores, subServices } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {
        <FormFactory
          translate={translate}
          isUpdate={updating}
          theme={theme}
          formElements={formElementsComercialInformation(dataServiceType, dataProducts, staff, stores, subServices)}
        />
      }
    </div>
  )
}
export default FormComercialInformation
