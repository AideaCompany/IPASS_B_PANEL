import { statusDevice, typeDevice } from './Device.interface'

export interface ICreateDevice {
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  exists: boolean
  actualLocation: string
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
}

export interface IUpdateDevice {
  _id: string
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  exists: boolean
  actualLocation: string
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
}
