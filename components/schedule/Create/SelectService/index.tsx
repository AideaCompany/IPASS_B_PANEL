import FormFactory from '@/components/crudFunctions/FormFactory'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IClient } from '@/types/interfaces/Clients/client.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import React, { useContext } from 'react'
import { formElements } from './formElements'

const SelectServices = ({
  services,
  isUpdate = false,
  translate,
  clients,
  staff
}: {
  services: IService[]
  translate: ITranslations
  isUpdate?: boolean
  clients: IClient[]
  staff: IStaff[]
}) => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="formContainer">
      {<FormFactory translate={translate} isUpdate={isUpdate} theme={theme} formElements={formElements(services, clients, staff)} />}
    </div>
  )
}

export default SelectServices
