import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps, IGroupWorker, ILocation, iTimeZone, Privilege } from '@/types/types'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElements } from './formElements'
const FormItems = (props: {
  permission: Privilege
  groups: IGroupWorker[]
  translations: Translations
  isUpdate?: boolean
  locations: ILocation[]
  timeZone: iTimeZone[]
  inicialData?: any
  apps: IApps[]
}): JSX.Element => {
  const { translations, isUpdate, locations, groups, apps, timeZone, inicialData } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const formItemFromPrivilege = () => {
    return formElements(locations, groups, timeZone, apps, inicialData)
  }

  return (
    <div className="formContainer">
      <FormFactory translate={translations} isUpdate={updating} theme={theme} formElements={formItemFromPrivilege()} />
    </div>
  )
}
export default FormItems
