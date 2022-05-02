import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementslaboral } from './formElementsLaboral'
const FormItemsLaboral = (props: {
  permission?: IPrivilege
  translate: ITranslations
  isUpdate?: boolean
  stores: IStores[]
  inicialData?: boolean | unknown
}): JSX.Element => {
  const { translate, isUpdate, inicialData, stores } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElementslaboral(stores, inicialData)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItemsLaboral
