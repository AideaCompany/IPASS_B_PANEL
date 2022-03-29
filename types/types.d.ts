import { TablePaginationConfig, TableProps } from 'antd'
import moment from 'moment'
import { type } from 'node:os'
import { basicTable } from './typeTemplate'

export interface IClient extends basicTable {
  password?: string
  plus: boolean
  name1?: string
  name2?: string
  photo?: fileType
  lastname1?: string
  lastname2?: string
  lastname3: string
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
  lastname?: string
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

export interface userSecurity extends DocumentNode, basicTable {
  user: User
}

export interface IEventExpress extends Document, basicTable {
  name: string
  host: User | string
  start: string
  end: string
  location: ILocation | string
  state: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  verified?: boolean
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  typeVerified?: string
  contact?: IContact
  motivo: string
  authorizedBy: IUser | string
  hourIn: string | Date
  invitados: IContact[] | string[]
  hourOut: string | Date
}

export interface iUserForm extends User {
  confirmPassword?: string
}

export interface Privilege extends basicTable {
  name?: string
  permissions?: PermissionsPrivilege[]
}

export type PermissionsPrivilege = {
  sectionID?: Sections['_id']
  read?: boolean
  create?: boolean
  delete?: boolean
  update?: boolean
  canRead?: boolean
  canCreate?: boolean
  canDelete?: boolean
  canUpdate?: boolean
  sectionName?: string
}

export type Sections = {
  _id: string
  name: string
  description: string
  createdAt: Date
  UpdatedAt: Date
}

export type HistoryAction = {
  userId: User['_id']
  action: string
  createdAt: string
  updatedAt: string
}

export type TablePropsCompoenet = {
  data?: any[]
  columns: any[]
  loading?: boolean
  pagination?: false | TablePaginationConfig
  scroll?: any
  onChange?: (pagination: TablePaginationConfig, filters: any, sorter: any) => void
  expandedRowRender?: any
  summary?: (data: any) => any
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

export type ListProps = {
  data?: any[]
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
  layoutMargin?: any
}

//User Secction

export type ButtonsCrudProps = {
  titleCreate?: string
  functionCreate?: () => void
}

export interface IWorker_qr_temporal extends Document, basicTable {
  worker: IWorker
  timeEnd: string
  QR: string
  used: boolean
  valid: boolean
}

export interface IGroupWorker extends Document, basicTable {
  name: string
  locations: ILocation[]
  abbreviation: string
  exists: boolean
}

export interface IWorker extends Document, basicTable {
  name?: string
  lastname?: string
  email?: string
  photo?: fileType
  apps: IApps[]
  codeWorker?: string
  code?: boolean
  // privilegeID?: IPrivilege
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  QR: string
  document?: string
  typeDocument?: string
  temporal_Qr: IWorker_qr_temporal
  group: IGroupWorker[]
  nativeLocation: ILocation[]
  canAccessToApp: boolean
  canAccessToWeb: boolean
  canUseAuthenticator: boolean
  timeZone: iTimeZone[]
  banFinish: string
  tokenExpo?: string
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
  services: string
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

export interface IVisitorCategory extends Document, basicTable {
  name: string
}

export type typeDevice = 'classic' | 'touch'
export type statusDevice = 'available' | 'occupied'

export interface IDevice extends Document, basicTable {
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  actualLocation: ILocation
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
}

export interface IMasterLocation extends Document, basicTable {
  name: string
  address: string
  location: ILocation[] | string[]
  onlyAllowAuthUSers: boolean
  state: string
  tree: any
  deletedDate: string
  whoDeleted: IUser | string
}

export type fileType = {
  filename: string
  key: string
}

export interface IVisitorBrand extends Document, basicTable {
  name: string
  photo: fileType
  category: IVisitorCategory
}

export interface IVisitorPlace extends Document, basicTable {
  name: string
}

export interface IApps extends Document, basicTable {
  name: string
  url: string
  abbreviation: string
  clientID: string
}

export interface IAuthenticator extends Document, basicTable {
  app: IApps
  code: string
  status: string
  user: User
  worker: IWorker
}

export interface ILocationEntries extends Document, basicTable {
  event: IEvent | string
  contact: IContact | string
  location: ILocation | string
  hourIn: string
  eventExpress: IEventExpress | string
  hourOut: string
  host: IUser | string
  worker: IWorker | string
  typeQr: typeQr
  user: IUser | string
  // Residente, invitado, visitante
  type: typeUser
  // visitantData: visitantData
}

// HISTORY
export interface IHistoryUser extends Document, basicTable {
  name?: string
  lastname?: string
  email?: string
  // password?: string
  privilegeID?: IPrivilege['_id']
  active?: boolean
  // token?: string
  admin: IUser | string
  canCreateHost: boolean
  allEventWithAuth: boolean
  // encryptPassword: (password: string) => Promise<string>
  // matchPassword: (password: string) => Promise<boolean>
  lang: LanguageType
  whoDeleted: IUser | string
  state: string
  deletedDate: string
  createdAt?: Date
  updatedAt?: Date
  origID: string
}

export interface IRisk extends Document, basicTable {
  name: string
  try: number
  ban: number
  actions: string[]
}

export interface IInvitationEvent extends Document, basicTable {
  event?: IEvent | string
  contact?: IContact | string
  confirmed?: boolean
  alreadySendInvitation?: boolean
  isIn?: boolean
  hourIn?: string
  host?: string | IUser
  expiration?: string
  location?: ILocation | string
}

export interface IRiskReset extends Document, basicTable {
  time: number
}

export interface iTimeZone extends Document, basicTable {
  name: string
  start: string | moment
  abbreviation: string
  end: string | moment
  days: Days[]
}

export type Days = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo'

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

export interface IBreach extends Document, basicTable {
  grade: string
  location: ILocation
  status: string
  worker: IWorker
  user: User
  contact: IContact
  createdAt?: Date
  updatedAt?: Date
}

export interface iLocationAttemptAnalythics extends Document, basicTable {
  dataCumpIncp: DataCumpIncp[]
  dataEvents: DataEvents[]
}

export interface iAttemptsByLocation {
  location: String
  CUMP: number
  INCP: number
  EVEP: number
  EVEE: number
}

export interface iDataEvents {
  month: string
  Eventos: number
  EventosExpress: number
}

export interface iDataCumpIncp {
  month: string
  CEXT: number
  CINT: number
  IINT: number
  IEXT: number
}

export interface iGeneralAnalythics {
  eventos: iGeneralValues
  eventosExpress: iGeneralValues
  incumplimientos: iGeneralValues
}

export interface iGeneralValues {
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
