export interface ICreateLocationAttempt {
  authenticated: boolean
  Worker: string
  user: string
  contact: string
  attempts: number
  location: string
  type: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUpdateLocationAttempt {
  _id: string
  authenticated: boolean
  Worker: string
  user: string
  contact: string
  attempts: number
  location: string
  type: string
  createdAt?: Date
  updatedAt?: Date
}
