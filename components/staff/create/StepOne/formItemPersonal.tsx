import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsPersonal } from './formElementsPersonal'
const FormItemsPersonal = (props: {
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
    return formElementsPersonal(stores, inicialData)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItemsPersonal
