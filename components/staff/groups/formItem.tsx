import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation } from '@/types/types'

import { useContext } from 'react'
import FormFactory from '../../crudFunctions/FormFactory'
import { formElements } from './formElements'
const FormItems = (props: { translations: Translations; isUpdate?: boolean; location: ILocation[] }): JSX.Element => {
  const { translations, isUpdate, location } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElements(location)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItems
