import { IContact, IEvent, IEventExpress, ILocationEntries, IWorker, User } from '@/types/types'
import { typeQr } from '@/types/valuesAddQr'

export const getType = (type: typeQr) => {
  switch (type) {
    case typeQr.event:
      return 'Evento'
    case typeQr.worker:
      return 'Trabajador'
    case typeQr.worker_temporal:
      return 'Trabajador'
    case typeQr.user_temporal:
      return 'Usuario'
    case typeQr.eventExpress:
      return 'Evento express'
  }
  return ''
}

export const getHost = (render: ILocationEntries) => {
  switch (render?.typeQr) {
    case typeQr.event:
      return `${(render?.event as IEvent).host?.name} ${(render?.event as IEvent).host?.lastname}`
    case typeQr.worker:
      return '-'
    case typeQr.worker_temporal:
      return '-'
    case typeQr.user_temporal:
      return '-'
    case typeQr.eventExpress:
      return `${((render?.eventExpress as IEventExpress)?.host as User)?.name} ${((render?.eventExpress as IEventExpress)?.host as User)?.lastname}`
  }
  return ''
}

export const getName = (render?: ILocationEntries) => {
  switch (render?.typeQr) {
    case typeQr.event:
      return (render?.contact as IContact)?.firstName
    case typeQr.worker:
      return `${(render?.worker as IWorker)?.name}`
    case typeQr.worker_temporal:
      return `${(render?.worker as IWorker)?.name}`
    case typeQr.user_temporal:
      return `${(render?.user as User)?.name}`
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
      return `${(render?.worker as IWorker)?.lastname}`
    case typeQr.worker_temporal:
      return `${(render?.worker as IWorker)?.lastname}`
    case typeQr.user_temporal:
      return `${(render?.user as User)?.lastname}`
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
      return `${(render?.worker as IWorker)?.document}`
    case typeQr.worker_temporal:
      return `${(render?.worker as IWorker)?.document}`
    case typeQr.user_temporal:
      return `${(render?.user as User)?.document}`
    case typeQr.eventExpress:
      return (render?.contact as IContact)?.DPI
  }
  return ''
}
