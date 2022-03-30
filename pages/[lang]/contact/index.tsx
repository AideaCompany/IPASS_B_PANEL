//react
//Components
import columns from '@/components/contact/columns'
import { formElements } from '@/components/contact/formElements'
import FormItems from '@/components/contact/formItem'
import CreateItem from '@/components/crudFunctions/create'
import MainLayout from '@/components/layout/Layout'
import TableDatas from '@/components/TableDatas'
import { createContact } from '@/graphql/contact/mutations/createContact'
import { deleteContact } from '@/graphql/contact/mutations/deleteContact'
import { updateContact } from '@/graphql/contact/mutations/updateContact'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllContactUser, subscribeContactUser } from '@/services/contact'
import { IContact, PermissionsPrivilege } from '@/types/types'
import { message } from 'antd'
import gql from 'graphql-tag'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

type actualItem = IContact
let uns: any

const perNames = ['Super_admin', 'super_anfitrion', 'admin']

const contact = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  //providers
  const { permission, user } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Contact'))
  }, [permission])

  useEffect(() => {
    if (actualPermission && user) {
      getData(true)
      uns = subscribeContactUser(
        (newData: boolean) => {
          getData(false)
          setLoading(false)
        },
        perNames.includes(permission.name) ? null : user._id
      )
    }

    return () => {
      if (uns && uns.unsubscribe) {
        uns.unsubscribe()
      }
    }
  }, [actualPermission, user])

  const getData = async (toLoading?: boolean) => {
    toLoading && setLoading(true)
    const contacts = await getAllContactUser()
    setData(contacts)
    toLoading && setLoading(false)
  }

  const manageMentError = (error: any) => {
    if (error.search('E11000 duplicate key error collection') > -1) {
      message.error({ content: 'Contacto con DPI ya existente', key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

  const manageMentErrorUpdate = (error: any) => {
    if (error.search('E11000 duplicate key error collection') > -1) {
      message.error({ content: 'Contacto con DPI ya existente', key: 'update' })
    } else {
      message.error({ content: localization.translations.errorUpdated, key: 'update' })
    }
  }

  return (
    <>
      <MainLayout
        create={
          <CreateItem
            iconButton={true}
            actualPermission={actualPermission as PermissionsPrivilege}
            translations={localization.translations}
            mutation={gql(createContact)}
            formElements={formElements()}
            manageMentError={manageMentError}
            afterCreate={getData}
            FormItem={<FormItems permission={permission} translations={localization.translations} />}
            /* manageMentError={manageMentError} */
          />
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <>
          <TableDatas
            columns={columns({
              translations: localization.translations,
              actualPermisions: actualPermission as PermissionsPrivilege,
              deleteMutation: gql(deleteContact),
              updateMutation: gql(updateContact),
              after: getData,
              permission,
              manageMentError: manageMentErrorUpdate
            })}
            data={data}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(contact)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'contact')
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
