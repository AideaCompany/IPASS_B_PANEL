import { formElementsSuperanfitrion } from '@/components/contact/formelementsSuperAnfitrion'
import FormFactory from '@/components/crudFunctions/FormFactory'
import { ThemeContext } from '@/providers/ThemeContext'
import { createContactFn } from '@/services/contact'
import { createEventExpressFn } from '@/services/eventExpress'
import { IContact, IEventExpress } from '@/types/types'
import { CommonPropsModal } from '@/utils/utils'
import { ArrowLeftOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Tooltip, FormInstance, message } from 'antd'
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { formElementsCreate } from '../formElementsCreate'
import { iProps } from './props.interface'
import Tablecontac from './Tablecontac'

const CreateEventExpressModal: FC<iProps> = ({ translations, contacts, translationsContact, getContacts, locations }) => {
  //#region provider
  const { theme } = useContext(ThemeContext)
  //#endregion provider

  //#region ref
  const formRef = useRef<FormInstance<IContact>>(null)
  const formRefEvent = useRef<FormInstance<IEventExpress>>(null)
  //#endregion ref

  //#region states
  const [visible, setVisible] = useState(false)
  const [searchedData, setSearchedData] = useState(contacts)
  const [contactsInvitation, setContactsInvitation] = useState<IContact[]>([])
  const [selectedContact, setSelectedContact] = useState<React.Key[]>([])
  const [createContact, setCreateContact] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingEvent, setLoadingEvent] = useState(false)
  //#endregion states

  // console.log(se;e)

  //#region  effect
  useEffect(() => {
    setSearchedData(contacts)
  }, [contacts])

  useEffect(() => {
    if (selectedContact.length > 0) {
      //@ts-ignore
      setContactsInvitation(contacts.filter(e => e._id !== selectedContact[0]).map(e => ({ ...e, name: `${e.name} - ${e.DPI}` })))
      formRefEvent.current?.setFieldsValue({ invitados: [] })
    }
  }, [selectedContact])
  //#endregion effect

  //#region functions
  const handleClose = () => {
    setVisible(false)
    setSearchedData(contacts)
    setSelectedContact([])
    setCreateContact(false)
  }

  const onSearch = (value: any) => {
    const text = value.target.value
    text !== '' ? setSearchedData(contacts && contacts.filter(e => e?.DPI?.includes(text?.toLowerCase()))) : setSearchedData(contacts)
  }

  const createEvent = async () => {
    setLoadingEvent(true)
    try {
      const data = formRefEvent.current?.getFieldsValue()
      const event = await createEventExpressFn({ ...(data as IEventExpress), contact: selectedContact[0] })
      if (event) {
        setVisible(false)
        setLoadingEvent(false)
        setCreateContact(false)
        formRefEvent.current?.resetFields()
        getContacts()
        handleClose()
        message.success('Evento express creado con exito')
      }
    } catch (error) {
      message.error('Error al crear el evento express')
      console.log(error)
    } finally {
      setLoadingEvent(false)
    }
  }

  const createCon = async () => {
    setLoading(true)
    try {
      const data = formRef.current?.getFieldsValue()
      if (!data?.indicativo) {
        (data as IContact).indicativo = '+502'
      }
      const newContact = await createContactFn(data as IContact)
      await getContacts()
      setSelectedContact([newContact._id])
      setCreateContact(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  //#endregion functions

  return (
    <>
      <Modal onCancel={handleClose} {...CommonPropsModal} visible={visible} width={createContact ? 800 : 1200}>
        <div className="container_create_event_express">
          <div className="contact">
            {!createContact ? (
              <>
                <h2>Información de visitante</h2>
                <div className="searchContact">
                  <Input.Search
                    onChange={onSearch}
                    style={{ marginBottom: 10 }}
                    enterButton
                    allowClear
                    placeholder="Buscar DPI de contacto existente"
                  ></Input.Search>
                  <Tablecontac
                    setSelectedContact={setSelectedContact}
                    selectedContact={selectedContact}
                    data={searchedData}
                    translations={translationsContact}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="formContainer">
                  <Form initialValues={{ verificationRegistro: true }} ref={formRef}>
                    <FormFactory translate={translationsContact} theme={theme} formElements={formElementsSuperanfitrion()} isUpdate={false} />
                  </Form>
                </div>
              </>
            )}

            <div className="buttonsContact flex">
              {!createContact ? (
                <>
                  <Button icon={<UserOutlined />} shape="round" type="primary" onClick={() => setCreateContact(true)}>
                    Crear Contacto
                  </Button>
                  <Button type="primary" shape="round" style={{ marginLeft: 8 }} onClick={() => setSelectedContact([])}>
                    Desasociar contacto
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ marginRight: 10 }}
                    icon={<ArrowLeftOutlined />}
                    shape="round"
                    type="primary"
                    onClick={() => setCreateContact(false)}
                  >
                    Regresar
                  </Button>
                  <Button loading={loading} icon={<PlusOutlined />} shape="round" type="primary" onClick={createCon}>
                    Crear Contacto
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="eventExpress">
            <h2>Información de Evento Express</h2>
            <div className="formContainer">
              <Form initialValues={{ open: true }} ref={formRefEvent}>
                <FormFactory
                  translate={translations}
                  theme={theme}
                  formElements={formElementsCreate(locations, contactsInvitation)}
                  isUpdate={false}
                />
              </Form>
            </div>
            <div className="buttonsContact flex">
              <Button
                title={selectedContact.length ? 'Debes seleccionar un contacto' : ''}
                disabled={selectedContact.length === 0}
                loading={loadingEvent}
                icon={<PlusOutlined />}
                shape="round"
                type="primary"
                onClick={createEvent}
              >
                Crear Evento Express
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Tooltip title={translations.titleModalCreate}>
        <Button style={{ margin: '5px' }} onClick={() => setVisible(true)} shape="circle" icon={<PlusOutlined />} />
      </Tooltip>
    </>
  )
}

export default React.memo(CreateEventExpressModal)
