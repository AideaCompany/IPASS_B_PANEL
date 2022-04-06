import { IVisitorCategory } from '../VisitorCategory/VisitorCategory.interface'
import { fileType } from '../index'
import { basicTable } from '@/types/typeTemplate'

export interface IVisitorBrand extends basicTable {
  name: string
  photo: fileType
  category: IVisitorCategory
}
