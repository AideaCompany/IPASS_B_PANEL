//types
import { deleteStores } from '@/graphql/stores/mutations/deleteStores'
import { updateStores } from '@/graphql/stores/mutations/updateStores'
<<<<<<< HEAD
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IStores, iTimeZone, PermissionsPrivilege, Privilege } from '@/types/types'
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IService } from '@/types/interfaces/services/Services.interface'
import { IStores } from '@/types/interfaces/Stores/stores.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'

>>>>>>> dev
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'

const columns = (props: {
<<<<<<< HEAD
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
  timeZone: iTimeZone[]
}): ColumnType<IStores>[] => {
  const { translations, actualPermission, lang, after, timeZone } = props
=======
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
  timeZone: ITimeZone[]
  services: IService[]
}): ColumnType<IStores>[] => {
  const { translations, actualPermission, after, timeZone, services } = props
>>>>>>> dev

  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateStores)}
        record={record}
<<<<<<< HEAD
        FormItems={<Formitems translations={translations} timeZone={timeZone} isUpdate />}
        formElements={formElements(timeZone)}
=======
        FormItems={<Formitems services={services} translations={translations} timeZone={timeZone} isUpdate />}
        formElements={formElements(timeZone, services)}
>>>>>>> dev
        afterUpdate={after}
      />
      <DeleteWithUser
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteStores)}
        theme={theme}
        record={record}
        afterDelete={after}
      />
    </>
  )
  return ColumnFactory({
    columns: [
      {
        name: 'name',
        search: true
      },
      {
        name: 'address',
        search: true
      },

      {
        name: 'schedule',
<<<<<<< HEAD
        customRender: (record: any) => record?.schedule?.name
=======
        customRender: (record: any) => (record?.schedule as ITimeZone[])?.map(e => e.name).join(', ')
>>>>>>> dev
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
