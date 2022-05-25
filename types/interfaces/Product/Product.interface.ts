import { IBrands } from '../Brands/Brands.interface'
import { IService } from '../services/Services.interface'

import { graphqlFile, uploadedFile } from '..'
import { basicTable } from '@/types/typeTemplate'

export interface IProduct extends basicTable {
  name: string
  abbreviation: string
  brand: IBrands | string
  photo: graphqlFile | uploadedFile
  productType: string
  price: number
  measureType: string
  amount: number
  services: string[] | IService[]
  designedFor: string
}
