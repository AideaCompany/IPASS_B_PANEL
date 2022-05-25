import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IService } from '@/types/interfaces/services/Services.interface'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElements3 } from './formElements3'

const FormItems3 = (props: { translate: ITranslations; isUpdate?: boolean; services: IService[] }): JSX.Element => {
  const { translate, isUpdate, services } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElements3(services)} />}
    </div>
  )
}
export default FormItems3
