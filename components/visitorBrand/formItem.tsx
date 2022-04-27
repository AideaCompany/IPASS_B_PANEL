import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IVisitorCategory } from '@/types/interfaces/VisitorCategory/VisitorCategory.interface'
import { fileType } from '@/types/typeTemplate'

import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; categories: IVisitorCategory[]; photo?: fileType }): JSX.Element => {
  const { translations, isUpdate, categories, photo } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  return (
    <div className="formContainer">
      {<FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formElements(categories, photo)} />}
    </div>
  )
}
export default FormItems
