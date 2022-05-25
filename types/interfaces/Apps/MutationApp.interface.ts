export interface ICreateApps {
  name: string
  url: string
  clientID: string
  tokenKey: string
  abbreviation: string
  clientIDSecret: string
}

export interface IUpdateApps {
  _id: string
  name: string
  url: string
  clientID: string
  tokenKey: string
  abbreviation: string
  clientIDSecret: string
}
