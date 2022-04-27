import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'
const FormItems = (props: {
  permission: IPrivilege
  translations: ITranslations
  isUpdate?: boolean
  stores: IStores[]
  inicialData?: boolean | unknown
}): JSX.Element => {
  const { translations, isUpdate, inicialData, stores } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElements(stores, inicialData)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItems
