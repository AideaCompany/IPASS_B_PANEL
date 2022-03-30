import { basicTable } from '@/types/typeTemplate'

export interface ITimeZone extends basicTable {
  name: string
  start: string
  abbreviation: string
  end: string
  days: Days[]
}

export type Days = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'
