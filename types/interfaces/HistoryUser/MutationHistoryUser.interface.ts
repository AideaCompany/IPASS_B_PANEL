// History
export interface ICreateHistoryUser {
  name?: string
  lastName?: string
  email?: string
  privilegeID: string
  active?: boolean
  admin: string
  canCreateHost: boolean
  allEventWithAuth: boolean
  lang: string
  whoDeleted: string
  state: string
  createdAt?: Date
  updatedAt?: Date
  origID: string
  deletedDate: Date
}

export interface IUpdateHistoryUser {
  name?: string
  lastName?: string
  email?: string
  privilegeID: string
  active?: boolean
  admin: string
  canCreateHost: boolean
  allEventWithAuth: boolean
  lang: string
  whoDeleted: string
  state: string
  createdAt?: Date
  updatedAt?: Date
  origID: string
  deletedDate: Date
}
