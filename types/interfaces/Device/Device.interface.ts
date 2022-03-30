import { ILocation } from 'interfaces/Location/Location.interface'
import { Document } from 'mongoose'

export interface IDevice extends Document {
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
