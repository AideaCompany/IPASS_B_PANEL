export interface ICreateRisk {
  name: string
  try: number
  ban: number
  actions: string[]
}
export interface IUpdateRisk {
  _id: string
  name: string
  try: number
  ban: number
  actions: string[]
}
