import useSecurity from '@/providers/SecurityContext'
import { IContact, IEvent } from '@/types/types'
import { getTime } from '@/utils/utils'
import { UserOutlined } from '@ant-design/icons'
import { List, Tooltip } from 'antd'
import React from 'react'

const Events = () => {
  const { actualEvents, setEventData, setShowEvent, invitations, setShowContact, setContactData, setInvitationData, setShowInvitation } =
    useSecurity()

  const showEvent = (selected: IEvent) => {
    setEventData(selected)
    setShowEvent(true)
  }

  const seeInvitations = (selected: IEvent) => {
    setEventData(selected)
    setInvitationData(invitations.filter(e => e.event === selected._id))
    setShowInvitation(true)
  }

  const seeContact = (selected: IContact) => {
    setContactData(selected)
    setShowContact(true)
  }

  const seeGuestIn = (selected: IEvent) => {
    setEventData(selected)
    setInvitationData(invitations.filter(e => e.event === selected._id).filter(e => e.isIn))
    setShowInvitation(true)
  }

  return (
    <div className="event">
      {actualEvents.length > 0 ? (
        <>
          <List
            className={'listEvent'}
            size="default"
            header={
              <div className="titleHeader">
                <h2>{'Eventos'}</h2>
              </div>
            }
            pagination={
              actualEvents.length > 3
                ? {
                    size: 'small',

                    pageSize: 3
                  }
                : false
            }
            dataSource={actualEvents}
            renderItem={item => (
              <List.Item>
                <div className="listItem">
                  <Tooltip title="Ver evento">
                    <span style={{ cursor: 'pointer' }} onClick={() => showEvent(item)}>
                      {item?.name}
                    </span>
                  </Tooltip>
                  <div className="iconElements">
                    <span>{`${getTime(item.start)}`}</span>
                    {!item.express ? (
                      <>
                        <Tooltip title={'Ver invitados'}>
                          <span style={{ cursor: 'pointer' }} onClick={() => seeInvitations(item)}>
                            {item.contacts?.length}
                            <UserOutlined style={{ marginLeft: '5px' }} />
                          </span>
                        </Tooltip>
                        <Tooltip title={'Ver ingresos'}>
                          <span onClick={() => seeGuestIn(item)} style={{ marginLeft: '5px', cursor: 'pointer' }}>
                            {invitations.filter(e => e.event === item._id).filter(e => e.isIn).length}
                            <UserOutlined style={{ marginLeft: '5px', color: 'green' }} />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title={'Ver contacto'}>
                          <span style={{ cursor: 'pointer' }} onClick={() => seeContact((item as any).contact as IContact)}>
                            <UserOutlined style={{ marginLeft: '5px' }} />
                          </span>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <h1>{'Sin eventos'}</h1>
        </div>
      )}
    </div>
  )
}

export default Events
