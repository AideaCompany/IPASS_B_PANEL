import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { IProduct, IServiceType, ISubService } from '@/types/types'

import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: {
  translations: ITranslations
  isUpdate?: boolean
  dataServiceType: IServiceType[] | undefined
  dataProducts: IProduct[] | undefined
  staff: IStaff[]
  stores: IStores[]
  subServices: ISubService[]
}): JSX.Element => {
  const { translations, isUpdate, dataServiceType, dataProducts, staff, stores, subServices } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {
        <FormFactory
          translate={translations}
          isUpdate={updating}
          theme={theme}
          formElements={formElements(dataServiceType, dataProducts, staff, stores, subServices)}
        />
      }
    </div>
  )
}
export default FormItems
