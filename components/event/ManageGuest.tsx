/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAllContactUser } from '@/services/contact'
import { createInvitation, deleteInvitation, getAllInvitationByEvent } from '@/services/invitationEvent'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IInvitationEvent } from '@/types/interfaces/InvitationEvent/InvitationEvent.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { getTime } from '@/utils/utils'
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Input, message, Modal, Tooltip } from 'antd'
import { Shield } from 'icons/personalIcons'
import { capitalize } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { ITranslations } from '../../i18n/types'
import { ThemeContext } from '../../providers/ThemeContext'

const ManageGuest = (props: { translations: ITranslations; record: IEvent }): JSX.Element => {
  const { translations, record } = props
  const { theme } = useContext(ThemeContext)
  const [visible, setvisible] = useState<boolean>(false)
  const [searchedGuest, setSearchedGuest] = useState<IContact[]>([])
  const [guestUsers, setguestUsers] = useState<IContact[]>([])
  const [invitation, setinvitation] = useState<IInvitationEvent[]>([])
  // useEffect(() => {
  //   getData()
  // }, [])
  useEffect(() => {
    getData()
  }, [record])

  const getData = async () => {
    const currentGuestUsers = await getAllContactUser()
    setinvitation(await getAllInvitationByEvent(record._id as string))
    setguestUsers(currentGuestUsers)
    setSearchedGuest(currentGuestUsers)
  }

  const onSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (value.target.value !== '') {
      setSearchedGuest(
        guestUsers &&
          guestUsers.filter(e =>
            `${(e.firstName as string)?.toLowerCase()} ${(e.lastName as string)?.toLowerCase()}`.includes(value.target.value.toLowerCase())
          )
      )
    } else {
      setSearchedGuest(guestUsers)
    }
  }

  const asingGuest = (user: IContact, checked: boolean, pos: number) => {
    if (!checked) {
      askToSendInvitation(user)
    } else {
      askToDeleteInvitation(user, pos)
    }
  }

  const askToSendInvitation = (user: IContact) => {
    Modal.warning({
      title: 'Enviar invitación',
      content: `¿Está seguro que desea enviar una invitación a ${capitalize(user.firstName)} ${capitalize(user.lastName)}?`,
      onOk: async () => {
        message.loading({ content: translations.sendingInvitation, key: 'send', duration: 0 })
        await createInvitation({ event: record._id, contact: user._id, confirmed: false, alreadySendInvitation: false })
        getData()
        message.success({ content: translations.okInvitation, key: 'send' })
      },
      okCancel: true
    })
  }

  const askToDeleteInvitation = (user: IContact, pos: number) => {
    Modal.error({
      title: 'Eliminar invitación',
      content: `¿Está seguro que desea eliminar la invitación a ${capitalize(user.firstName)} ${capitalize(user.lastName)}?`,
      onOk: async () => {
        await deleteInvitation(invitation[pos]._id as string)
        getData()
      },
      okCancel: true
    })
  }
  return (
    <>
      <Tooltip placement="top" title={translations.guestManagement}>
        <a>
          <UserOutlined style={{ paddingLeft: '5px' }} onClick={() => setvisible(true)} />
        </a>
      </Tooltip>
      <Modal
        destroyOnClose
        footer={[<div key={0}></div>]}
        onCancel={() => setvisible(false)}
        className={`modalCrud${theme}`}
        visible={visible}
        title={translations.titleEditUserLocation}
        maskClosable={true}
        centered
      >
        <>
          <h2>{`${record?.name} ${(record?.location as ILocation)?.name}`}</h2>
          <Input.Search onChange={onSearch} />
          {searchedGuest?.map((user, i) => {
            const pos = invitation?.findIndex(e => (e?.contact as IContact)?._id === user._id)
            const checked = pos !== -1
            return (
              <Tooltip key={i} title={checked ? 'Cancelar invitación' : 'Enviar invitación'}>
                <div key={i} className="modalContent" onClick={() => asingGuest(user, checked, pos)}>
                  <p>{`${user?.firstName as string} ${user.lastName as string} - ${user.email as string}`}</p>
                  <div>
                    {checked && invitation[pos].isIn && getTime(invitation[pos].hourIn as string)}
                    {user.verified && (
                      <Tooltip title={'El contacto es verificado'}>
                        {/* @ts-ignore */}
                        <Shield style={{ color: 'green', marginRight: '5px' }} />
                      </Tooltip>
                    )}
                    {checked &&
                      (invitation[pos].confirmed === true ? (
                        <Tooltip title={'El contacto acepto la invitación'}>
                          <CheckCircleOutlined style={{ color: 'blue', marginRight: '5px' }} />
                        </Tooltip>
                      ) : (
                        !invitation[pos].confirmed === false && (
                          <Tooltip title={'El contacto rechazo la invitación'}>
                            <CloseCircleOutlined style={{ color: 'red', marginRight: '5px' }} />
                          </Tooltip>
                        )
                      ))}

                    {checked && (
                      <Tooltip title={'Invitación enviada'}>
                        <CheckOutlined style={{ color: 'green' }} />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </Tooltip>
            )
          })}
        </>
      </Modal>
    </>
  )
}

export default React.memo(ManageGuest)
