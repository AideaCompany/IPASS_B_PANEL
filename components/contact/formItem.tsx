import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'
import { formElementsSuperanfitrion } from './formelementsSuperAnfitrion'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; permission?: IPrivilege }): JSX.Element => {
  const { translations, isUpdate, permission } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)

  return (
    <div className="formContainer">
      {
        <FormFactory
          translate={translations}
          isUpdate={updating}
          theme={theme}
          formElements={permission?.name === 'super_anfitrion' ? formElementsSuperanfitrion() : formElements()}
        />
      }
    </div>
  )
}
export default FormItems
