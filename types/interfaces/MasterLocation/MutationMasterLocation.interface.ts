import { operation } from '../index'
import { ILocation } from '../Location/Location.interface'
import { IUser } from '../user/User.interface'
import { ITreeMaster } from './MasterLocation.interface'

export interface ICreateMasterLocation {
  name: string
  address: string
  location: ILocation[] | string[]
  operation?: operation
  onlyAllowAuthUSers: boolean
  state: string
  deletedDate: string
  whoDeleted: IUser | string
  tree: ITreeMaster[]
}

export interface IUpdateMasterLocation {
  _id: string
  name: string
  address: string
  location: ILocation[] | string[]
  operation?: operation
  onlyAllowAuthUSers: boolean
  state: string
  deletedDate: string
  whoDeleted: IUser | string
  tree: ITreeMaster[]
}
