/* eslint-disable no-extra-semi */
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
import { ICreatePrivilege, IUpdatePrivilege } from '@/types/interfaces/Privilege/MutationPrivilega.interface'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
//Types
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
  const [privilege, setPrivilege] = useState<IPrivilege[]>()
  const [permissionPermission, setPermissionPermission] = useState<IPermissionsPrivilege>()
  const { permission, section } = useAuth()
  const { theme } = useContext(ThemeContext)
  //const
  const columns: ColumnType<IPrivilege>[] = [
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
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      setLoading(true)
      const privilegesData: ApolloQueryResult<{
        listPrivilege: IPrivilege[]
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
      listPrivilege: IPrivilege[]
    }> = await client.query({ query: gql(listPrivilege), fetchPolicy: 'no-cache' })
    const privileges = privilegesData.data.listPrivilege.map(e => ({ ...e, key: e._id }))

    setPrivilege(privileges)
    setLoading(false)
  }

  const getDataForm = (data: { permissions: string[]; name: string }) => {
    const key = Object.keys(data.permissions)

    const inputData: IPrivilege = { name: data.name, permissions: [] }

    for (const currentKey of key) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      inputData.permissions?.push({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ...data.permissions[currentKey]
      })
    }
    return inputData
  }

  //Create
  const createPrivilegeForm = (data: ICreatePrivilege) => {
    setLoading(true)
    client
      .mutate({ mutation: gql(createPrivilege), variables: { input: getDataForm(data) } })
      .then(() => {
        refetchData()
      })
      .catch(err => console.info(err))
  }

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
  const updatePrivilegeForm = (data: IUpdatePrivilege, id: string) => {
    const toUpdate = { _id: id, ...getDataForm(data) }
    console.log(toUpdate)
    setLoading(true)
    client
      .mutate({ mutation: gql(updatePrivilege), variables: { input: toUpdate } })
      .then(() => {
        refetchData()
      })
      .catch(err => console.info(err))
  }

  const updateModal = (data: IPrivilege) => {
    const perms: IPrivilege = {} as IPrivilege
    data.permissions.forEach(e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      perms[e.sectionID as string] = { ...e }
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
            onFinish={(values: IUpdatePrivilege) => updatePrivilegeForm(values, data._id as string)}
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
      .then(() => {
        refetchData()
      })
      .catch(err => console.info(err))
  }

  const deleteModal = (role: IPrivilege) => {
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

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'permission')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
