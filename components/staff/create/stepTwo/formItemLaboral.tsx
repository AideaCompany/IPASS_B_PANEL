import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import React, { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsLaboral } from './formElementsLaboral'
const FormItemsLaboral = (props: {
  permission?: IPrivilege
  translate: ITranslations
  isUpdate?: boolean
  stores: IStores[]
  service: IService[]
}): JSX.Element => {
  const { translate, isUpdate, stores, service } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElementsLaboral(stores, service)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItemsLaboral
