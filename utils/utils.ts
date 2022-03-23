import { formatData, IContact, IEvent, ILocationEntries } from '@/types/types'
import { basicTable } from '@/types/typeTemplate'
import { ModalProps } from 'antd'
import moment from 'moment-timezone'
export const capitalize = (s: string | undefined): string => {
  if (typeof s !== 'string') return ''
  s = s.toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const convertTotable = <T extends basicTable>(items: T[]): T[] => {
  const newItem: T[] = JSON.parse(JSON.stringify([...items]))
  newItem.map(e => (e.key = e._id))
  return newItem.reverse()
}
export const CommonPropsModal: ModalProps = {
  footer: null,
  width: '80%',
  centered: true,
  destroyOnClose: true
}
export const convertTotableOne = <T extends basicTable>(items: T): T => {
  const newItem: T = JSON.parse(JSON.stringify(items))
  newItem.key = newItem._id
  return newItem
}

export const getTime = (dateTime: any): string => {
  const time = moment.tz(dateTime, 'America/Guatemala')
  return time.locale('es').format('DD/MM/YYYY, h:mm a')
}

export const formatFiltersTable = (filters: any): any => {
  return Object.keys(filters)
    .map(key => filters[key] && { [key]: filters[key][0] })
    .filter(e => e)
}

export const disabledDateFn = (current: any) => {
  return current && current < moment().startOf('day')
}

export const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
export const perNames = ['Super_admin', 'super_anfitrion', 'admin']

export const getFormatData = (data: ILocationEntries[]): formatData[] =>
  data.map(e => ({
    key: e._id as string,
    type: e.type,
    name: e.type === 'I' ? (e.contact as IContact)?.firstName : e.host?.name,
    lastName: e.type === 'I' ? (e.contact as IContact)?.lastName : e.host?.lastname,
    hourIn: e.hourIn,
    event: e.event as IEvent,
    host: e.host,
    contact: e.contact as IContact
  }))

export const getFormatDataOne = (data: ILocationEntries): formatData => ({
  key: data._id as string,
  type: data.type,
  name: data.type === 'I' ? (data.contact as IContact).firstName : data.host.name,
  lastName: data.type === 'I' ? (data.contact as IContact).lastName : data.host.lastname,
  hourIn: data.hourIn,
  event: data.event as IEvent,
  host: data.host,
  contact: data.contact as IContact
})

export const getSex = (sex: any): string => {
  const sexs = {
    Masculino: 'Masculino',
    masculino: 'Masculino',
    Male: 'Masculino',
    male: 'Masculino',
    M: 'Masculino',
    m: 'Masculino',
    Femenino: 'Femenino',
    femenino: 'Femenino',
    Female: 'Femenino',
    female: 'Femenino',
    F: 'Femenino',
    f: 'Femenino'
  }
  const isValid =
    sex === 'Masculino' ||
    sex === 'masculino' ||
    sex === 'Male' ||
    sex === 'male' ||
    sex === 'M' ||
    sex === 'm' ||
    sex === 'Femenino' ||
    sex === 'femenino' ||
    sex === 'Female' ||
    sex === 'female' ||
    sex === 'F' ||
    sex === 'f'

  if (!isValid) {
    return 'Desconocido'
  }
  //@ts-ignore
  return sexs[sex]
}
