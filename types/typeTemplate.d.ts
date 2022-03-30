import { ColumnFilterItem } from 'antd/lib/table/interface'

export type ColumnFactoryType<T> = {
  name: string
  search?: boolean
  sort?: boolean
  filter?: ColumnFilterItem[]
  customRender?: (render: T, index?: number) => JSX.Element | string
  customFilter?: string
  filteredValue?: T
  fixed?: 'left' | 'right' | false
  width?: string
  ellipsis?: boolean
}

export type basicTable = {
  _id: string
  key?: string
  createdAt?: Date
  updatedAt?: Date
  operation?: operation
}
export type operation = 'create' | 'update' | 'delete'
/**
 *  Type para form factory
 */
export namespace FormFactory {
  /**
   *  Type para form factory
   *
   * @param FormFactoryType
   * @param typeForm Tipo de item
   */
  export interface IFormFactoryType<T> {
    /**
     * @param name Nombre del item, colocar el mismo para errores y para label
     * @param type Tipo de item
     * @param visible Para mostrar o no un label
     * @param required Saber si el form es requerido
     * @param adicionalProps Agrega props adicionales para modificar los props por default de cada componente
     * @param fullWidth 100% de ancho
     * @param data Cuando type es de tipo select o selectMultiple es obligatorio para mostrar las opciones
     * @param actualFormRef Para tablas, es la referencia actual del formulario
     * @param FormItems Para tablas, es el formulario para la tabla
     * @param columnsItem Para tablas, son las columnas para la tabla
     * @param inicialData Para tablas, en caso de que sea un update, para colocar los datos anteriores
     * @param formListElements Para formularios dinamicos, espeficia elementos que seran agregados dinamicamente
     */
    name: string
    type: typeForm
    visible?: boolean
    required?: boolean
    adicionalProps?: object
    fullWidth?: boolean
    // Para selector
    data?: T[]
    //para Table
    actualFormRef?: FormInstance<T> | null | undefined
    FormItems?: (update: boolean, key?: string) => JSX.Element
    columnsItem?: ColumnFactoryType[]
    inicialData?: object
    //Para dynamic
    formListElements?: FormFactoryType[]
    //mostrar
    show?: boolean
  }
  export type typeForm =
    | 'string'
    | 'number'
    | 'date'
    | 'phone'
    | 'boolean'
    | 'email'
    | 'select'
    | 'textArea'
    | 'dynamic'
    | 'avatar'
    | 'table'
    | 'upload'
    | 'selectMultiple'
    | 'dateRange'
    | 'hour'
    | 'dateNoTime'
}

export type fileType = {
  _id: string
  filename: string
  key: string
}
