export interface ICreateEvent {
  rangeTime?: [Date, Date]
  name: string
  host: string
  start: Date
  end: Date
  location: string
  beforeStart: number
  onlyAuthUser: boolean
  state: string
  deletedDate: Date
  whoDeleted: string
  guests: string[]
  open: boolean
}

export interface IUpdateEvent {
  _id: string
  name: string
  host: string
  start: Date
  end: Date
  location: string
  beforeStart: number
  onlyAuthUser: boolean
  state: string
  deletedDate: Date
  whoDeleted: string
  open: boolean
}
