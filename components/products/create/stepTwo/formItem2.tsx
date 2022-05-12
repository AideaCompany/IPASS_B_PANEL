import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formelements2 } from './formElements2'

const FormItems2 = (props: { translate: ITranslations; isUpdate?: boolean; inicialData?: any }): JSX.Element => {
  const { translate, isUpdate, inicialData } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formelements2(inicialData)} />}
    </div>
  )
}
export default FormItems2
