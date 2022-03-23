import { getAllContactUser } from '@/services/contact'
import { createInvitation, deleteInvitation, getAllInvitationByEvent } from '@/services/invitationEvent'
import { IContact, IEvent, InvitationEvent } from '@/types/types'
import { getTime } from '@/utils/utils'
import { CheckCircleOutlined, CheckOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Input, message, Modal, Tooltip } from 'antd'
import { Shield } from 'icons/personalIcons'
import { capitalize } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Translations } from '../../i18n/types'
import { ThemeContext } from '../../providers/ThemeContext'
const ManageGuest = (props: { translations: Translations; record: IEvent }): JSX.Element => {
  const { translations, record } = props
  const { theme } = useContext(ThemeContext)
  const [visible, setvisible] = useState<boolean>(false)
  const [searchedGuest, setSearchedGuest] = useState<IContact[]>([])
  const [guestUsers, setguestUsers] = useState<IContact[]>([])
  const [invitation, setinvitation] = useState<InvitationEvent[]>([])
  // useEffect(() => {
  //   getData()
  // }, [])
  useEffect(() => {
    getData()
  }, [record])

  const getData = async () => {
    const guestUsers = await getAllContactUser()
    setinvitation(await getAllInvitationByEvent(record._id as string))
    setguestUsers(guestUsers)
    setSearchedGuest(guestUsers)
  }

  const onSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    value.target.value !== ''
      ? setSearchedGuest(
          guestUsers &&
            guestUsers.filter(e => `${e.firstName?.toLowerCase()} ${e.lastName?.toLowerCase()}`.includes(value.target.value.toLowerCase()))
        )
      : setSearchedGuest(guestUsers)
  }

  const asingGuest = async (user: IContact, checked: boolean, pos: number) => {
    if (!checked) {
      await askToSendInvitation(user)
      //  @ts-ignore
    } else {
      await askToDeleteInvitation(user, pos)
    }
  }

  const askToSendInvitation = async (user: IContact) => {
    Modal.warning({
      title: 'Enviar invitación',
      content: `¿Está seguro que desea enviar una invitación a ${capitalize(user.firstName)} ${capitalize(user.lastName)}?`,
      onOk: async () => {
        message.loading({ content: translations.sendingInvitation, key: 'send', duration: 0 })
        // @ts-ignore
        await createInvitation({ event: record._id as string, contact: user._id as string, confirmed: false, alreadySendInvitation: false })
        getData()
        message.success({ content: translations.okInvitation, key: 'send' })
      },
      okCancel: true
    })
  }

  const askToDeleteInvitation = async (user: IContact, pos: number) => {
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
          <h2>{`${record?.name} ${record?.location?.name}`}</h2>
          <Input.Search onChange={onSearch} />
          {searchedGuest?.map((user, i) => {
            const pos = invitation?.findIndex(e => (e?.contact as IContact)?._id === user._id)
            const checked = pos !== -1
            return (
              <Tooltip title={checked ? 'Cancelar invitación' : 'Enviar invitación'}>
                <div key={i} className="modalContent" onClick={() => asingGuest(user, checked, pos)}>
                  <p>{`${user?.firstName} ${user.lastName} - ${user.email}`}</p>
                  <div>
                    {checked && invitation[pos].isIn && getTime(invitation[pos].hourIn as string)}
                    {user.verified && (
                      <Tooltip title={'El contacto es verificado'}>
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
