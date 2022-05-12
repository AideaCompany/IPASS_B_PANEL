import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import React, { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsResources } from './formElementsResources'

const FormResources = (props: { translate: ITranslations; isUpdate?: boolean; dataProducts?: IProduct[]; staff: IStaff[] }): JSX.Element => {
  const { translate, isUpdate, dataProducts, staff } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElementsResources(dataProducts, staff)} />}
    </div>
  )
}
export default FormResources
