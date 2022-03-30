export interface IApps extends Document {
  _id: string
  name: string
  url: string
  clientID: string
  tokenKey: string
  abbreviation: string
  clientIDSecret: string
}
