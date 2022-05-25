import { updateStyleHair } from '@/graphql/styleHair/mutations/updateStyleHair'
<<<<<<< HEAD
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IstyleHair, PermissionsPrivilege, Privilege } from '@/types/types'
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'

>>>>>>> dev
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { Avatar, Image } from 'antd'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteWithUser from '../crudFunctions/deleteWithUser'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import Formitems from './formItem'
import { UserOutlined } from '@ant-design/icons'
import { deleteStyleHair } from '@/graphql/styleHair/mutations/deleteStyleHair'
<<<<<<< HEAD

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IstyleHair>[] => {
  const { translations, actualPermission, lang, after } = props
=======
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IStyleHair } from '@/types/interfaces/StyleHair/styleHair.interface'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IStyleHair>[] => {
  const { translations, actualPermission, after } = props
>>>>>>> dev
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        // beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateStyleHair)}
        record={record}
        FormItems={<Formitems translations={translations} isUpdate />}
        formElements={formElements()}
        afterUpdate={after}
      />
      <DeleteWithUser
        actualPermisions={actualPermission}
        translations={translations}
        mutation={gql(deleteStyleHair)}
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
        name: 'photo',
<<<<<<< HEAD
        customRender: (record: IstyleHair, index) => {
=======
        customRender: (record: IStyleHair, index) => {
>>>>>>> dev
          console.log(`${process.env.NEXT_PUBLIC_S3}/${record?.photo?.key}`)
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar
                  style={{ border: '1px solid #ff8623', overflow: 'hidden' }}
                  src={<Image preview={true} src={`${process.env.NEXT_PUBLIC_S3}/${record?.photo?.key}`} />}
                />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      },
      {
        name: 'text',
        search: true
      },
      {
        name: 'question',
        search: true
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
