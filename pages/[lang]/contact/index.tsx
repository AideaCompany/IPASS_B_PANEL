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
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { message } from 'antd'
import gql from 'graphql-tag'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

type actualItem = IContact
let uns: ZenObservable.Subscription

const contact = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
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
        () => {
          getData(false)
          setLoading(false)
        }
        // perNames.includes(permission.name) ? null : user._id
      )
    }

    return () => {
      if (uns && uns.unsubscribe) {
        uns.unsubscribe()
      }
    }
  }, [actualPermission, user])

  const getData = async (toLoading?: boolean) => {
    if (toLoading) {
      setLoading(true)
    }
    const contacts = await getAllContactUser()
    setData(contacts)
    if (toLoading) {
      setLoading(false)
    }
  }

  const manageMentError = (currenTerror: string) => {
    if (currenTerror.search('E11000 duplicate key error collection') > -1) {
      message.error({ content: 'Contacto con DPI ya existente', key: 'creating' })
    } else {
      message.error({ content: localization.translations.errorCreated, key: 'creating' })
    }
  }

  const manageMentErrorUpdate = (error: string) => {
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
            actualPermission={actualPermission as IPermissionsPrivilege}
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
              actualPermisions: actualPermission as IPermissionsPrivilege,
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

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'contact')
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
