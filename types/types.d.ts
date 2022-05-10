import { TablePaginationConfig, TableProps } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { TableProps as RcTableProps } from 'rc-table/lib/Table'
import { graphqlFile, uploadedFile } from './interfaces'
import { IStaff } from './interfaces/staff/staff.interface'
import { basicTable } from './typeTemplate'

export type IProducts = {
  product: IProduct | string
  productQuantity: number
}

export interface IUserSecurity extends DocumentNode, basicTable {
  user: User
}

export interface IUserForm extends User {
  confirmPassword?: string
}

export type HistoryAction = {
  userId: User['_id']
  action: string
  createdAt: string
  updatedAt: string
}

export interface ITablePropsComponent<T> {
  data?: T[]
  columns: ColumnType<T>[]
  loading?: boolean
  pagination?: false | TablePaginationConfig
  scroll?: RcTableProps<T>['scroll']
  onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T> | SorterResult<T>[]) => void
  expandedRowRender?: boolean
  summary?: (data: T) => JSX.Element
  aditionalProps?: TableProps
}

export type CardProps = {
  eventsToday: IEvent[]
  eventsTomorrow: IEvent[]
  eventsYesterday: IEvent[]
  todayAttempts: number
  yesterdayAttempts: number
  attempts: ILocationAttempt[]
}

export type ListProps<T> = {
  data?: T[]
  loading?: boolean
  actualPermission: PermissionsPrivilege
  translations: Translations
  formItem: JSX.Element
  after?: () => void
}

export type LayoutProps = {
  children: JSX.Element
  title: string
  lang: string
  getData?: () => void
  create?: JSX.Element
  hideButtons?: boolean
  notShowHeader?: boolean
  layoutMargin?: CSSProperties
}

//User Secction

export type ButtonsCrudProps = {
  titleCreate?: string
  functionCreate?: () => void
}

export interface IWorkerQrTemporal extends Document, basicTable {
  worker: IWorker
  timeEnd: string
  QR: string
  used: boolean
  valid: boolean
}

export type typeCheck = 'in' | 'out'

export interface InvitationEvent extends basicTable {
  event?: IEvent | string
  contact?: IContact | string
  confirmed?: boolean
  hourIn?: string
  isIn?: boolean
  alreadySendInvitation?: boolean
}

export type verifiedDataPDF = {
  photo?: fileType
  documentA?: fileType
  documentB?: fileType
  num1?: string
  type?: string
  name?: string
  expedition?: string
  expiration?: string
  licNum?: string
  num2?: string
}

export type verifiedData = {
  photo: fileType
  documentA: fileType
  documentB: fileType
  birthDate: string
  expirationDate: string
  sex: string
  lastName: string
  firstName: string
  nationality: string
  documentNumber: string
  correctionName: string
  correctionLastname: string
  correctionNumber: string
}

export type typeDevice = 'classic' | 'touch'
export type statusDevice = 'available' | 'occupied'

export type Days = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo'

export type ReadedMRZ = {
  birthDate?: string
  expirationDate?: string
  sex?: string
  firstName?: string
  lastName?: string
  nationality?: string
  documentNumber?: string
}

export type ReadedPDF = {
  num1?: string
  type?: string
  name?: string
  expedition?: string
  expiration?: string
  licNum?: string
  num2?: string
}

export interface ILocationAttempt extends Document, basicTable {
  authenticated: boolean
  user: IUser
  contact: IContact
  attempts: number
  location: ILocation
  createdAt?: Date
  updatedAt?: Date
}

export interface ILocationAttemptAnalythics extends Document, basicTable {
  dataCumpIncp: DataCumpIncp[]
  dataEvents: DataEvents[]
}

export interface IAttemptsByLocation {
  location: string
  CUMP: number
  INCP: number
  EVEP: number
  EVEE: number
}

export interface IDataEvents {
  month: string
  Eventos: number
  EventosExpress: number
}

export interface IDataCumpIncp {
  month: string
  CEXT: number
  CINT: number
  IINT: number
  IEXT: number
}

export interface IGeneralAnalythics {
  eventos: iGeneralValues
  eventosExpress: iGeneralValues
  incumplimientos: iGeneralValues
}

export interface IGeneralValues {
  yesterday: number
  today: number
  tomorrow: number
  si: number
}

export type formatData = {
  key: string
  type: 'R' | 'I' | 'V'
  name: string | undefined
  lastName: string | undefined
  hourIn: string
  event?: IEvent
  host?: User
  category?: string
  brand?: string
  destiny?: string
  contact?: IContact
}
