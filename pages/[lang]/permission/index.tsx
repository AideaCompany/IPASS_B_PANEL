//components
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
//Graphql
import client from '@/graphql/config'
import { createPrivilege, deletePrivilege, updatePrivilege } from '@/graphql/mutation'
import { listPrivilege } from '@/graphql/queries'
//i18n
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { ThemeContext } from '@/providers/ThemeContext'
//Types
import { PermissionsPrivilege, Privilege } from '@/types/types'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
//Apollo
import { ApolloQueryResult, gql } from '@apollo/client'
//AntD
import { Button, Form, Modal, Tooltip } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import FormData from './formData'
const Permissions = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //state
  const [loading, setLoading] = useState<boolean>(false)
  const [privilege, setPrivilege] = useState<Privilege[]>()
  const [permissionPermission, setPermissionPermission] = useState<PermissionsPrivilege>()
  const { permission, section } = useAuth()
  const { theme } = useContext(ThemeContext)
  //const
  const columns: ColumnType<Privilege>[] = [
    {
      key: 'name',
      title: localization.translations.rolName,
      dataIndex: 'name'
    },
    {
      title: localization.translations.operationTable,
      dataIndex: 'operacion',
      key: 'operacion',
      render: (_, record) => {
        return (
          <>
            {permissionPermission?.update && (
              <Tooltip placement="top" title={localization.translations.edit}>
                <a>
                  <EditOutlined style={{ paddingLeft: '5px' }} onClick={() => updateModal(record)} />
                </a>
              </Tooltip>
            )}

            {permissionPermission?.delete && (
              <Tooltip placement="top" title={localization.translations.delete}>
                <a>
                  <DeleteOutlined style={{ paddingLeft: '5px' }} onClick={() => deleteModal(record)} />
                </a>
              </Tooltip>
            )}
          </>
        )
      }
    }
  ]

  //effect
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const privilegesData: ApolloQueryResult<{
        listPrivilege: Privilege[]
      }> = await client.query({ query: gql(listPrivilege) })
      const privileges = privilegesData.data.listPrivilege.map(e => ({ ...e, key: e._id }))
      setPrivilege(privileges)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (permission) {
      setPermissionPermission(permission.permissions?.find(e => e.sectionName?.toLocaleLowerCase() === 'permission'))
    }
  }, [permission])

  //functions
  const refetchData = async () => {
    const privilegesData: ApolloQueryResult<{
      listPrivilege: Privilege[]
    }> = await client.query({ query: gql(listPrivilege), fetchPolicy: 'no-cache' })
    const privileges = privilegesData.data.listPrivilege.map(e => ({ ...e, key: e._id }))

    setPrivilege(privileges)
    setLoading(false)
  }

  const getDataForm = (data: any) => {
    var key = Object.keys(data.permissions)
    //@ts-ignore
    var inputData: Privilege = { name: data.name, permissions: [] }
    for (let k = 0; k < key.length; k++) {
      inputData.permissions?.push({
        ...data.permissions[key[k]]
      })
    }
    return inputData
  }

  //Create
  const createPrivilegeForm = (data: any) => {
    setLoading(true)
    client
      .mutate({ mutation: gql(createPrivilege), variables: { input: getDataForm(data) } })
      .then(res => {
        refetchData()
      })
      .catch(err => console.error(err))
  }

  // @ts-ignore
  const createModal = () => {
    Modal.info({
      title: localization.translations.titleModalCreate,
      content: (
        <div className="createModal">
          <Form name="basic" autoComplete="off" onFinish={createPrivilegeForm} id={'createForm'}>
            <FormData localization={localization} section={section} />
          </Form>
        </div>
      ),
      className: `modalCrud${theme}`,
      okButtonProps: { form: 'createForm', htmlType: 'submit' },
      centered: true,
      maskClosable: true,
      okCancel: true,
      cancelText: localization.translations.cancel
    })
  }
  //update
  const updatePrivilegeForm = (data: any, id: string) => {
    //@ts-ignore
    const toUpdate = { _id: id, ...getDataForm(data) }
    setLoading(true)
    client
      .mutate({ mutation: gql(updatePrivilege), variables: { input: toUpdate } })
      .then(res => {
        refetchData()
      })
      .catch(err => console.error(err))
  }

  const updateModal = (data?: any) => {
    const perms: any = {}
    data.permissions.forEach((e: any) => {
      perms[e.sectionID] = { ...e }
    })
    const initialData = {
      name: data.name,
      permissions: perms
    }

    Modal.info({
      title: localization.translations.titleModalUpdate,
      content: (
        <div className="createModal">
          <Form
            name="basic"
            autoComplete="off"
            onFinish={values => updatePrivilegeForm(values, data._id)}
            id={'updateForm'}
            initialValues={initialData}
          >
            <FormData localization={localization} section={section} />
          </Form>
        </div>
      ),
      className: `modalCrud${theme}`,
      okButtonProps: { form: 'updateForm', htmlType: 'submit' },
      centered: true,
      maskClosable: true,
      okCancel: true,
      cancelText: localization.translations.cancel
    })
  }
  //Delete
  const deletePrivilegeForm = (id?: string) => {
    setLoading(true)
    client
      .mutate({ mutation: gql(deletePrivilege), variables: { input: { _id: id } } })
      .then(res => {
        refetchData()
      })
      .catch(err => console.error(err))
  }

  const deleteModal = (role: Privilege) => {
    Modal.warn({
      title: localization.translations.titleModalDelete,
      content: <p>{`${localization.translations.deleteQuestion} ${role.name} ?`}</p>,
      onOk: () => deletePrivilegeForm(role._id)
    })
  }

  return (
    <MainLayout
      getData={refetchData}
      hideButtons
      create={
        <Tooltip title={localization.translations.titleModalCreate}>
          <Button style={{ margin: '5px' }} onClick={createModal} shape="circle" icon={<PlusOutlined />} />
        </Tooltip>
      }
      lang={lang}
      title={localization.translations.titlePermission}
    >
      <div>
        <TableData loading={loading} data={privilege} columns={columns}></TableData>
      </div>
    </MainLayout>
  )
}

export default Permissions

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'permission')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
