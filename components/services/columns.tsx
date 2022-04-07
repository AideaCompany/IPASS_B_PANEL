//types
import { deleteService } from '@/graphql/services/mutations/deleteService'
import { updateService } from '@/graphql/services/mutations/updateService'
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IService, IProduct, IServiceType, PermissionsPrivilege, Privilege } from '@/types/types'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import { ColumnType } from 'antd/lib/table'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElements'
import FormItems from './formItems'

const columns = (props: {
  translations: Translations
  actualPermission: PermissionsPrivilege
  beforeShowUpdate?: (param: any) => any
  privileges: Privilege[]
  after: () => void
  // filters: any[]
  dataServiceType: IServiceType[] | undefined
  dataProducts: IProduct[] | undefined
}): ColumnType<IService>[] => {
  const { translations, actualPermission, after, beforeShowUpdate, dataServiceType, dataProducts } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => (
    <>
      <UpdateItem
        beforeShowUpdate={beforeShowUpdate}
        actualPermission={actualPermission}
        translations={translations}
        mutation={gql(updateService)}
        record={record}
        afterUpdate={after}
        FormItems={<FormItems dataProducts={dataProducts} dataServiceType={dataServiceType} translations={translations} isUpdate />}
        formElements={formElements(dataServiceType, dataProducts)}
      />
      <DeleteItem
        actualPermission={actualPermission}
        afterDelete={after}
        translations={translations}
        mutation={gql(deleteService)}
        theme={theme}
        record={record}
      />
    </>
  )
  return ColumnFactory({
    columns: [
      {
        name: 'photo',
        fixed: 'left',
        width: 60,
        customRender: (record: IService, index) => {
          return (
            <div>
              {record?.photo?.key ? (
                <Avatar style={{ border: '1px solid #ff8623', overflow: 'hidden' }} src={<Image preview={true} src={record.photo.key} />} />
              ) : (
                <Avatar style={{ border: '1px solid #ff8623' }} icon={<UserOutlined />} />
              )}
            </div>
          )
        }
      },
      {
        name: 'name',
        fixed: 'left',
        width: 150,
        search: true
      },
      {
        name: 'abbreviation',
        fixed: 'left',
        width: 150,
        search: true
      },
      {
        name: 'type',
        fixed: 'left',
        width: 150,
        search: true
      },
      {
        name: 'plus',
        search: true,
        width: 150
      },
      {
        name: 'products',
        search: true,
        width: 150
      },
      {
        name: 'staffers',
        search: true,
        width: 150
      },
      {
        name: 'eta',
        search: true,
        width: 150
      },
      {
        name: 'price',
        search: true,
        width: 150
      },
      {
        name: 'cost',
        search: true,
        width: 150
      },
      {
        name: 'serviceFee',
        search: true,
        width: 150
      },
      {
        name: 'taxes',
        search: true,
        width: 150
      },
      {
        name: 'discounts',
        search: true,
        width: 150
      },
      {
        name: 'serviceTime',
        search: true,
        width: 150
      },
      {
        name: 'returnTime',
        search: true,
        width: 150
      },
      {
        name: 'sex',
        search: true,
        width: 150
      },
      {
        name: 'stores',
        search: true,
        width: 150
      },
      {
        name: 'subService',
        search: true,
        width: 150
      }
    ],
    translate: translations,
    operations: operations,
    operationOptions: {
      fixed: 'right',
      width: 120
    },
    nonShowOperation: !actualPermission?.update && !actualPermission?.delete && true
  })
}

export default columns
