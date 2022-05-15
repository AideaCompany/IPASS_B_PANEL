export interface ICreateServiceSchedule {
  service: string
  staff: string
  hour: string
  day: string
}

export interface IUpdateServiceSchedule {
  _id: string
  service: string
  staff: string
  hour: string
  day: string
}
