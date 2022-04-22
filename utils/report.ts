import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IEvent } from '@/types/interfaces/Event/event.interface'
import { IEventExpress } from '@/types/interfaces/EventExpress/eventExpress.interface'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { typeQr } from '@/types/interfaces/valuesAddQr'

export const getType = (type?: typeQr) => {
  switch (type) {
    case typeQr.event:
      return 'Evento'
    case typeQr.worker:
      return 'staffer'
    case typeQr.worker_temporal:
      return 'staffer'
    case typeQr.user_temporal:
      return 'Usuario'
    case typeQr.eventExpress:
      return 'Evento express'
  }
  return ''
}

export const getHost = (render: ILocationEntries) => {
  switch (render.typeQr) {
    case typeQr.event:
      return `${((render?.event as IEvent).host as IUser)?.name as string} ${((render?.event as IEvent).host as IUser)?.lastName as string}`
    case typeQr.worker:
      return '-'
    case typeQr.worker_temporal:
      return '-'
    case typeQr.user_temporal:
      return '-'
    case typeQr.eventExpress:
      return `${((render?.eventExpress as IEventExpress)?.host as IUser)?.name as string} ${
        ((render?.eventExpress as IEventExpress)?.host as IUser)?.lastName as string
      }`
  }
  return ''
}

export const getName = (render?: ILocationEntries) => {
  switch (render?.typeQr) {
    case typeQr.event:
      return (render?.contact as IContact)?.firstName
    case typeQr.worker:
      return `${(render?.staff as IStaff)?.name as string}`
    case typeQr.worker_temporal:
      return `${(render?.staff as IStaff)?.name as string}`
    case typeQr.user_temporal:
      return `${(render?.user as IUser)?.name as string}`
    case typeQr.eventExpress:
      return (render?.contact as IContact)?.firstName
  }
  return ''
}
export const getLastName = (render?: ILocationEntries) => {
  switch (render?.typeQr) {
    case typeQr.event:
      return (render?.contact as IContact)?.lastName
    case typeQr.worker:
      return `${(render?.staff as IStaff)?.lastName}`
    case typeQr.worker_temporal:
      return `${(render?.staff as IStaff)?.lastName}`
    case typeQr.user_temporal:
      return `${(render?.user as IUser)?.lastName as string}`
    case typeQr.eventExpress:
      return (render?.contact as IContact)?.lastName
  }
  return ''
}

export const getDpi = (render?: ILocationEntries) => {
  switch (render?.typeQr) {
    case typeQr.event:
      return (render?.contact as IContact)?.DPI
    case typeQr.worker:
      return `${(render?.staff as IStaff)?.name1 as string}`
    case typeQr.worker_temporal:
      return `${(render?.staff as IStaff)?.name1 as string}`
    case typeQr.user_temporal:
      return `${(render?.user as IUser)?.name1 as string}`
    case typeQr.eventExpress:
      return (render?.contact as IContact)?.DPI
  }
  return ''
}
