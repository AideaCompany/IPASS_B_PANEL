import { IVisitorCategory } from '../VisitorCategory/VisitorCategory.interface'

import { basicTable, fileType } from '@/types/typeTemplate'

export interface IVisitorBrand extends basicTable {
  name: string
  photo: fileType
  category: IVisitorCategory
}
