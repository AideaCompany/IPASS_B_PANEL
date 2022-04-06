export interface ICreateEventExpress {
  name: string
  host: string
  start: Date
  end: Date
  location: string
  state: string
  motivo: string
  contact: string
  authorizedBy: string
  hourIn: string
  hourOut: string
  createdAt?: Date
  updatedAt?: Date
  invitados?: string[]
  open: boolean
}

export interface IUpdateEventExpress {
  _id: string
  name: string
  host: string
  start: Date
  end: Date
  location: string
  state: string
  motivo: string
  contact: string
  authorizedBy: string
  hourIn: string
  hourOut: string
  createdAt?: Date
  updatedAt?: Date
  invitados?: string[]
  open: boolean
}
