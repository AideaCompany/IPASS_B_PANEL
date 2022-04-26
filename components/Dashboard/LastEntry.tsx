import useSecurity from '@/providers/SecurityContext'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { typeQr } from '@/types/interfaces/valuesAddQr'

import { getLastName, getName, getType } from '@/utils/report'
import { getTime } from '@/utils/utils'
import { CalendarOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import { List, Tooltip } from 'antd'
import { Shield, Worker } from 'icons/personalIcons'
import React from 'react'

const LastEntry = () => {
  const { entries, setContactData, setShowContact, setEventData, setShowEvent } = useSecurity()
  const toSeeContact = (item: IContact) => {
    setContactData(item)
    setShowContact(true)
  }
  const seeEvent = (event: IEvent | IEventExpress) => {
    setEventData(event)
    setShowEvent(true)
  }
  const getIcons = (type: typeQr) => {
    switch (type) {
      case typeQr.event:
        return <CalendarOutlined />
      case typeQr.worker:
        return <Worker />
      case typeQr.worker_temporal:
        return (
          <>
            <Worker />
            <FieldTimeOutlined />
          </>
        )
      case typeQr.user_temporal:
        return <UserOutlined />

      case typeQr.eventExpress:
        return (
          <>
            <CalendarOutlined /> <FieldTimeOutlined />
          </>
        )
    }
    return <UserOutlined />
  }

  const convertToContact = (item: ILocationEntries): IContact => {
    if (item.staff) {
      return {
        DPI: (item.staff as IStaff).name,
        firstName: (item.staff as IStaff).name as string,
        lastName: (item.staff as IStaff).lastName as string
      } as IContact
    }
    if (item.user) {
      return {
        DPI: (item.user as IUser).document,
        firstName: (item.user as IUser).name as string,
        lastName: (item.user as IUser).lastName as string
      } as IContact
    }
    return item.contact as IContact
  }

  return (
    <div className="lastEntry">
      {entries.length > 0 ? (
        <>
          <List
            className={'listEntry'}
            size="default"
            header={
              <div className="titleHeader">
                <h2>{'Últimos ingresos'}</h2>
              </div>
            }
            pagination={
              entries.length > 3
                ? {
                    size: 'small',

                    pageSize: 3
                  }
                : false
            }
            dataSource={entries}
            renderItem={item => (
              <List.Item>
                <div className="listItem">
                  <div className="userInfo">
                    <Tooltip title={getType(item.typeQr)}>
                      <span style={{ marginRight: '5px' }}>{getIcons(item.typeQr as typeQr)}</span>
                    </Tooltip>
                    <Tooltip title="Ver usuario">
                      <span className="username" style={{ cursor: 'pointer' }} onClick={() => toSeeContact(convertToContact(item))}>
                        {`${getName(item)} ${getLastName(item)}`}
                      </span>
                    </Tooltip>

                    <span>{(item.contact as IContact)?.verified && <Shield style={{ color: 'green', marginLeft: '5px' }} />}</span>
                  </div>

                  <div className="iconElements">
                    <span>
                      {`${getTime(item.hourIn)}`}
                      <FieldTimeOutlined style={{ marginLeft: '5px', marginRight: '5px' }} />
                    </span>
                    {item.event && (
                      <Tooltip title={'Ver evento'}>
                        <span style={{ cursor: 'pointer' }} onClick={() => seeEvent(item.event as IEvent)}>
                          <CalendarOutlined style={{ marginRight: '5px' }} />
                          <span>{(item.event as IEvent)?.name}</span>
                        </span>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <h1>{'Sin ingresos'}</h1>
        </div>
      )}
    </div>
  )
}

export default LastEntry
