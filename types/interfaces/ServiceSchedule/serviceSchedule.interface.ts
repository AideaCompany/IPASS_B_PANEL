import { IClient } from '../Clients/client.interface'
import { IService } from '../services/Services.interface'
import { IStaff } from '../staff/staff.interface'
import { IStores } from '../Stores/stores.interface'

export interface IServiceSchedule extends Document {
  _id: string
  service: IService | string
  staffer: IStaff | string
  hour: string
  day: string
  shoppingCard: string
  client: IClient | string
  store: IStores | string
  createdAt?: Date
  UpdatedAt?: Date
}
