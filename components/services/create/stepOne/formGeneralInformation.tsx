import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsGeneralInformation } from './formElementsGeneralInformation'

const FormGeneralInformation = (props: {
  translate: ITranslations
  isUpdate?: boolean
  dataServiceType?: IServiceType[]
  inicialData?: any
}): JSX.Element => {
  const { translate, isUpdate, dataServiceType, inicialData } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {
        <FormFactory
          translate={translate}
          isUpdate={updating}
          theme={theme}
          formElements={formElementsGeneralInformation(dataServiceType, inicialData)}
        />
      }
    </div>
  )
}
export default FormGeneralInformation
