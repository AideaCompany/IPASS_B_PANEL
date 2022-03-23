import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { resendVerification } from '@/services/contact'
import { IContact, Privilege } from '@/types/types'
import { Button, message } from 'antd'
import { useContext } from 'react'
import FormFactory from '../crudFunctions/FormFactory'
import { formElementsSuperanfitrion } from './formelementsSuperAnfitrion'
import { formElements } from './formElementsUpdate'

const FormItems = (props: { translations: Translations; isUpdate?: boolean; id: string; permission: Privilege; record: IContact }): JSX.Element => {
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
