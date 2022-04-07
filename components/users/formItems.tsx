/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { fileType } from '@/types/typeTemplate'

import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'
import { formElementsAdmin } from './formElementsAdmin'
import { formElementsSuperAdmin } from './formElementsSuperAdmin'
const FormItems = (props: {
  permission: IPrivilege
  translations: ITranslations
  isUpdate?: boolean
  privileges: IPrivilege[]
  locations: ILocation[]
  timeZone: ITimeZone[]
  group: IGroupWorker[]
  apps: IApps[]
  inicialData?: boolean | fileType
}): JSX.Element => {
  const { translations, isUpdate, apps, privileges, permission, locations, group, timeZone, inicialData } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    switch (permission.name) {
      case 'Super_admin':
        return formElementsSuperAdmin(privileges, locations, timeZone, group, apps, inicialData)
      case 'admin':
        return formElementsAdmin(privileges, locations, timeZone, group, inicialData)
      default:
        return formElements(privileges, apps, locations, timeZone, inicialData)
    }
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItems
