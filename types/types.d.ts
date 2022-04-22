import { TablePaginationConfig, TableProps } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { TableProps as RcTableProps } from 'rc-table/lib/Table'
import { basicTable } from './typeTemplate'

export type IProducts = {
  product: IProduct | string
  productQuantity: number
}
export interface IService extends basicTable {
  plus?: boolean
  abbreviation?: string
  name?: string
  type?: IServiceType | string
  products?: IProducts[]
  photo?: fileType
  staffers?: string[]
  eta?: string
  price?: number
  cost?: number
  serviceFee?: number
  taxes?: number
  discounts?: number
  serviceTime?: number[]
  returnTime?: number
  sex?: string
  stores?: string[]
  subService?: ISubService[]
}

export interface ISubService extends basicTable {
  plus?: boolean
  abbreviation?: string
  name?: string
  products?: IProducts[]
  photo?: fileType
  staffers?: string[]
  eta?: string
  price?: number
  cost?: number
  subServiceFee?: number
  taxes?: number
  discounts?: number
  subServiceTime?: number[]
  returnTime?: number
  stores?: string[]
}

export interface IClient extends basicTable {
  password?: string
  plus: boolean
  name1?: string
  name2?: string
  photo?: fileType
  lastName1?: string
  lastName2?: string
  lastName3: string
  phone1?: string
  phone2?: string
  email?: string
  privateAddress?: string
  businessAddress?: string
  occupation?: string
  age?: Date
  sex?: string
  ranking?: number
  channel?: string
  trm?: string
  pt?: string
  rom?: string
  lastVisit?: string
  referrals?: string
  servicesNotes?: string
  productsNotes?: string
  document?: string
  medicalNotes?: string
  socialMedia?: [string]
  createdAt?: Date
  updatedAt?: Date
}
export interface User extends basicTable {
  password?: string
  name?: string
  canUseAuthenticator?: boolean
  lastName?: string
  email?: string
  nativeLocation?: ILocation[]
  privilegeID?: IPrivilege
  active?: boolean
  photo?: fileType
  codeWorker?: string
  country?: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
  lang?: LanguageType
  verifyLogin: boolean
  admin: User | string
  canCreateHost: boolean
  allEventWithAuth: boolean
  canAccessToApp: boolean
  canAccessToWeb: boolean
  document: string
  typeDocument: string
  code: boolean
  phone: string
  QR: string
  group: IGroupWorker[] | string[]
  timeZone: iTimeZone[] | string[]
  banFinish: string
  apps: IApps[]
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

export interface ILocation extends Document, basicTable {
  state: string
  masterLocation: IMasterLocation | string
  childLocations: String[] | ILocation[]
  parentLocations: String[] | ILocation[]
  address: string
  name: string
  admins: IUser[] | string[]
  operation?: operation
  typeCheck: typeCheck
  device: IDevice
  host: IUser[] | string[]
  security: IUser[] | string[]
  abbreviation: string
}

export interface IProduct extends Document, basicTable {
  name: string
  abbreviation: string
  brand: string
  photo: fileType
  productType: string
  price: number
  measureType: string
  amount: number
  services: IService[] | string[]
  designedFor: string
}

export interface IEvent extends Document, basicTable {
  name: string
  start: string | any
  host: User
  end: string | any
  location: ILocation
  onlyAuthUser: boolean
  beforeStart: number
  state: string
  express?: boolean
  deletedDate: string
  whoDeleted: IUser | string
  contacts?: IContact[] | undefined | string | InvitationEvent[]
}

export interface InvitationEvent extends basicTable {
  event?: IEvent | string
  contact?: IContact | string
  confirmed?: boolean
  hourIn?: string
  isIn?: boolean
  alreadySendInvitation?: boolean
}

export interface Paginated<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  offset: number
  prevPage: number
  nextPage: number
}

export interface IContact extends Document, basicTable {
  DPI?: string
  firstName?: string
  lastName?: string
  indicativo?: string
  email?: string
  phone?: string
  host?: User | string
  nickname?: string
  typeVerified?: 'PASS' | 'DPI' | 'PDF'
  verified?: boolean
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish?: string
  verificationRegistro: boolean
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

export interface IRiskReset extends Document, basicTable {
  time: number
}

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

export interface IServiceType extends Document, basicTable {
  name: string
}
