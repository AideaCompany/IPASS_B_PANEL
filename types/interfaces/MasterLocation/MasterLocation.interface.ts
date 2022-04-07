import { basicTable } from '@/types/typeTemplate'
import { operation } from '../index'
import { ILocation } from '../Location/Location.interface'
import { IUser } from '../user/User.interface'

export interface IMasterLocation extends basicTable {
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

export interface ITreeMaster {
  source: string
  target: string
  id: string
  type: 'buttonedge' | 'customnode'
  data: {
    label: string
  }
}

export interface IDeleteMasterLocationChangeStatus {
  whoDeleted: string
  _id: string
}
