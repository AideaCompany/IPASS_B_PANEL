import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import React, { useContext } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'
import { formElementsResources } from './formElementsResources'

const FormResources = (props: { translate: ITranslations; isUpdate?: boolean; products: IProduct[] }): JSX.Element => {
  const { translate, isUpdate, products } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={formElementsResources(products)} />}
    </div>
  )
}
export default FormResources
