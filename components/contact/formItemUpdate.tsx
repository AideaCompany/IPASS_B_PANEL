import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { resendVerification } from '@/services/contact'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'

import { Button, message } from 'antd'
import React, { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElementsSuperanfitrion } from './formelementsSuperAnfitrion'
import { formElements } from './formElementsUpdate'

const FormItems = (props: { translations: ITranslations; isUpdate?: boolean; id: string; permission: IPrivilege; record: IContact }): JSX.Element => {
  const { translations, isUpdate, id, permission, record } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const sendVerification = async () => {
    message.loading({ key: 'info', content: 'Enviando verificación', duration: 0 })
    await resendVerification(id)
    message.success({ key: 'info', content: 'Verificación enviada con exito' })
  }
  return (
    <div className="formContainer">
      <FormFactory
        translate={translations}
        isUpdate={updating}
        theme={theme}
        formElements={permission.name === 'super_anfitrion' ? formElementsSuperanfitrion() : formElements()}
      />
      {!record?.verified && (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <Button style={{ width: '100%' }} type="primary" onClick={sendVerification}>
            Enviar Verificación
          </Button>
        </div>
      )}
    </div>
  )
}
export default FormItems
