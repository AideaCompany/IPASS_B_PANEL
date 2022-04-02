export type FilterType = { [value: string]: string }[] | { [value: string]: string }

export interface IPaginateRequirement {
  page: number
  limit: number
  filters: FilterType
}

export interface IGetItem {
  _id: string
}

export interface IPaginated<T> {
  docs: [T]
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
export interface IResponseMassive {
  email: string
  success: boolean
  reason: string
}

export interface IManagementError {
  graphQLErrors: { message: string }[]
}
