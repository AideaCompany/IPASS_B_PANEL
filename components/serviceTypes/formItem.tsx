<<<<<<< HEAD
import { Translations } from '@/i18n/types'
=======
import { ITranslations } from '@/i18n/types'
>>>>>>> dev
import { ThemeContext } from '@/providers/ThemeContext'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

<<<<<<< HEAD
const FormItems = (props: { translations: Translations; isUpdate?: boolean }): JSX.Element => {
  const { translations, isUpdate } = props
=======
const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; inicialData?: unknown }): JSX.Element => {
  const { translations, isUpdate, inicialData } = props
>>>>>>> dev
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
<<<<<<< HEAD
    <div className="formContainer">{<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements()} />}</div>
=======
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(inicialData)} />}
    </div>
>>>>>>> dev
  )
}
export default FormItems
