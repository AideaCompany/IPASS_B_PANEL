//types
import { deleteServiceType } from '@/graphql/serviceType/mutation/deleteServiceType'
import { updateServiceType } from '@/graphql/serviceType/mutation/updateServiceType'
<<<<<<< HEAD
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, PermissionsPrivilege, Privilege } from '@/types/types'
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { uploadedFile } from '@/types/interfaces'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
>>>>>>> dev
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'
<<<<<<< HEAD
const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  permision: Privilege
  lang: string
  after: () => void
}): ColumnType<ILocation>[] => {
=======

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  after: () => void
}): ColumnType<IServiceType>[] => {
>>>>>>> dev
  const { translations, actualPermission, permision, after } = props
  const { theme } = useContext(ThemeContext)

  // const getFormElements = () => {
  //   switch (permision.name) {
  //     case 'Super_admin':
  //       return formElementsSuperAdmin()
  //     default:
  //       return formElements()
  //   }
  // }

<<<<<<< HEAD
  const operations = (record: ILocation) => {
=======
  const operations = (record: IServiceType) => {
    console.log(record)
    const newLogo = {
      logo: {
        filename: '',
        key: ''
      }
    }
    newLogo.logo.key = `${process.env.NEXT_PUBLIC_S3}/${record.logo?.key}`
    newLogo.logo.filename = (record.logo as uploadedFile)?.filename
>>>>>>> dev
    return (
      <>
        <UpdateItem
          afterUpdate={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateServiceType)}
          record={record}
<<<<<<< HEAD
          FormItems={<FormItems translations={translations} isUpdate />}
          formElements={formElements()}
=======
          FormItems={<FormItems inicialData={newLogo.logo} translations={translations} isUpdate />}
          formElements={formElements(newLogo.logo)}
>>>>>>> dev
        />
        <DeleteItem
          afterDelete={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(deleteServiceType)}
          theme={theme}
          record={record}
        />
      </>
    )
  }

  return ColumnFactory({
    columns: [
      {
        name: 'name'
<<<<<<< HEAD
      }
    ],
    translate: translations,
=======
      },
      {
        name: 'logo',
        customRender: (record: IServiceType, index) => {
          return (
            <div>
              {record?.logo?.key ? (
                <Avatar
                  style={{ border: '1px solid #ff8623', overflow: 'hidden' }}
                  src={<Image preview={true} src={`${process.env.NEXT_PUBLIC_S3}/${record.logo.key}`} />}
                />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      }
    ],
    translate: translations,
    //@ts-ignore
>>>>>>> dev
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
