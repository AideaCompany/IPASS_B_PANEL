import { basicTable } from '@/types/typeTemplate'

export interface IRisk extends basicTable {
  name: string
  try: number
  ban: number
  actions: string[]
}
