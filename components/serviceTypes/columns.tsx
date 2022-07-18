//types
import { deleteServiceType } from '@/graphql/serviceType/mutation/deleteServiceType'
import { updateServiceType } from '@/graphql/serviceType/mutation/updateServiceType'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItem'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  after: () => void
}): ColumnType<IServiceType>[] => {
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

  const operations = (record: IServiceType) => {
    console.log(record)

    return (
      <>
        <UpdateItem
          afterUpdate={after}
          actualPermission={actualPermission}
          translations={translations}
          mutation={gql(updateServiceType)}
          record={record}
          FormItems={<FormItems inicialData={record.logo} translations={translations} isUpdate />}
          formElements={formElements(record.logo)}
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
      },
      {
        name: 'logo',
        customRender: (record: IServiceType, index) => {
          return (
            <div>
              {record?.logo?.key ? (
                <Avatar style={{ border: '1px solid #ff8623', overflow: 'hidden' }} src={<Image preview={true} src={`${record.logo.key}`} />} />
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
    operations: operations,
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && permision.name !== 'admin' && true
  })
}

export default columns
