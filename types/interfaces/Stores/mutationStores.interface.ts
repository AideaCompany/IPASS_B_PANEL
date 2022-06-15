export interface ICreateStores {
  name: string
  address: string
  schedule: string[]
  services: string[]
  generes: string[]
  location: { lat: number; lng: number }
  department: string
  city: string
  zone: number
  phone: string
  contact: string
}

export interface IUpdateStores {
  _id: string
  name: string
  address: string
  schedule: string[]
  services: string[]
  generes: string[]
  location: { lat: number; lng: number }
  department: string
  city: string
  zone: number
  phone: string
  contact: string
}
