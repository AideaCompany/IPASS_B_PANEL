import { basicTable } from '@/types/typeTemplate'
import { Moment } from 'moment-timezone'

export interface ITimeZone extends basicTable {
  name: string
  start: string | Moment
  abbreviation: string
  end: string | Moment
  days: Days[]
}

export type Days = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'
