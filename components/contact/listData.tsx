import { deleteContact } from '@/graphql/contact/mutations/deleteContact'
import { updateContact } from '@/graphql/contact/mutations/updateContact'
import { ThemeContext } from '@/providers/ThemeContext'
import { IContact, ListProps } from '@/types/types'
import { List } from 'antd'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import DeleteItem from '../crudFunctions/delete'
import UpdateItem from '../crudFunctions/update'
import { formElements } from './formElementsUpdate'

const ListData = (props: ListProps): JSX.Element => {
  const { data, loading, actualPermission, translations, formItem, after } = props
  const { theme } = useContext(ThemeContext)
  return (
    <List
      style={{ background: '#fff', padding: '25px', borderRadius: '15px' }}
      dataSource={data}
      loading={loading ? true : false}
      renderItem={(item: IContact, i) => (
        <List.Item key={i}>
          <List.Item.Meta style={{ maxWidth: '40%' }} title={`${item.firstName} ${item.lastName}`} description={item.email} />
          <div className="contactInfo">
            {/* <p>{item.nickname}</p> */}
            <p>{item.phone}</p>
            <p>
              {item.verified ? (
                <div>
                  <p style={{ color: 'rgba(35, 203, 167, 1)' }}>Verificado</p>
                  {/* <CheckCircleFilled style={{ color: 'rgba(35, 203, 167, 1)' }} /> */}
                </div>
              ) : (
                <div>
                  <p style={{ color: 'rgba(207, 0, 15,1)' }}>Sin verificar</p>
                  {/* <CloseCircleFilled style={{ color: 'rgba(207, 0, 15,1)' }} /> */}
                </div>
              )}
            </p>
            <UpdateItem
              /* beforeShowUpdate={beforeShowUpdate} */
              afterUpdate={after}
              actualPermission={actualPermission}
              translations={translations}
              mutation={gql(updateContact)}
              record={item}
              FormItems={formItem}
              formElements={formElements()}
            />
            <DeleteItem
              actualPermission={actualPermission}
              translations={translations}
              mutation={gql(deleteContact)}
              theme={theme}
              record={item}
              afterDelete={after}
            />
          </div>
        </List.Item>
      )}
    />
  )
}

export default ListData
