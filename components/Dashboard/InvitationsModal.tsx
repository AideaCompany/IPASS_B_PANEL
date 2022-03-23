import useSecurity from '@/providers/SecurityContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact } from '@/types/types'
import { getTime } from '@/utils/utils'
import { Modal, Tooltip } from 'antd'
import { Shield } from 'icons/personalIcons'
import React, { useContext } from 'react'

const ModalGuest = (): JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const { showInvitation, setShowInvitation, setShowContact, setContactData, invitationData, eventData } = useSecurity()
  const showContact = (contact: IContact) => {
    setContactData(contact)
    setShowContact(true)
  }
  return (
    <>
      <Modal
        destroyOnClose
        onCancel={() => setShowInvitation(false)}
        onOk={() => setShowInvitation(false)}
        className={`modalCrud${theme}`}
        visible={showInvitation}
        title={``}
        maskClosable={true}
        centered
        width={700}
      >
        <div className="invitationModal">
          <h1>{`${'Invitados'} ${eventData?.name}`}</h1>
          {invitationData.map((guest, i) => (
            <Tooltip key={i} title="Ver ficha de invitado">
              <div className="itemGuest" onClick={() => showContact(guest.contact as IContact)}>
                <div> {`${(guest.contact as IContact)?.firstName} ${(guest.contact as IContact)?.lastName}  `}</div>

                <div>
                  {guest.hourIn ? getTime(guest.hourIn) : 'Sin ingreso'}
                  {(guest.contact as IContact)?.verified && <Shield style={{ color: 'green', marginRight: '5px', marginLeft: '5px' }} />}
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </Modal>
    </>
  )
}

export default React.memo(ModalGuest)
