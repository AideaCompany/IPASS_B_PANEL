export interface ICreateGroupWorker {
  name: string
  location: string[]
  exists: boolean
  abbreviation: string
}

export interface IUpdateGroupWorker {
  _id: string
  name: string
  location: string[]
  exists: boolean
  abbreviation: string
}
