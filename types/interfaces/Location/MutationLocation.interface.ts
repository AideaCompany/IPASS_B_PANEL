export interface ICreateLocation {
  masterLocation: string
  childLocations: string[]
  parentLocations: string[]
  address: string
  name: string
  admins: string[]
  typeCheck: string
  device: string
  host: string[]
  security: string[]
  state: string
  deletedDate: Date
  whoDeleted: string
  abbreviation: string
  empresa: string
}

export interface IUpdateLocation {
  _id: string
  masterLocation: string
  childLocations: string[]
  parentLocations: string[]
  address: string
  name: string
  admins: string[]
  typeCheck: string
  device: string
  host: string[]
  security: string[]
  state: string
  deletedDate: Date
  whoDeleted: string
  abbreviation: string
  empresa: string
}
