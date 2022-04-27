import { basicTable } from '@/types/typeTemplate'
import { ILocation } from '../Location/Location.interface'

export interface IDevice extends basicTable {
  _id: string
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  exists: boolean
  actualLocation: ILocation
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
}

export type statusDevice = 'available' | 'occupied'

export type typeDevice = 'classic' | 'touch'
