//react
//Components
import columns from '@/components/eventExpress/columns'
import CreateEventExpressModal from '@/components/eventExpress/CreateEventExpress'
import MainLayout from '@/components/layout/Layout'
import TableDatas from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllContactUser, subscribeContactUser } from '@/services/contact'
import { listEventExpressFn, subListEventExpressFn } from '@/services/eventExpress'
import { getAllLocationActive } from '@/services/locations'
import { IContact, IEventExpress, ILocation, PermissionsPrivilege } from '@/types/types'
import { perNames } from '@/utils/utils'
import { capitalize } from 'fogg-utils'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'

interface actualItem extends IEventExpress {}
var unsContact: any
var unsEveExpress: any
const EventExpress = (props: { localization: Localization; lang: string; localizationContact: Localization }) => {
  //props
  const { localization, lang, localizationContact } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [locations, setLocations] = useState<ILocation[]>([])
  const [contacts, setContacts] = useState<IContact[]>([])

  //providers
  const { permission, user } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'eventExpress'))
  }, [permission])

  useEffect(() => {
    if (actualPermission && user) {
      unsContact = subscribeContactUser(
        (newData: boolean) => {
          getData(false)
        },
        perNames.includes(permission.name as string) ? null : (user._id as string)
      )
      unsEveExpress = subListEventExpressFn((newData: boolean) => {
        getData(false)
      })
    }

    return () => {
      if (unsContact && unsContact.unsubscribe) {
        unsContact.unsubscribe()
      }
      if (unsEveExpress && unsEveExpress.unsubscribe) {
        unsEveExpress.unsubscribe()
      }
    }
  }, [actualPermission, user])

  const getData = async (toLoading?: boolean) => {
    setLoading(true)
    const eventsExpress = await listEventExpressFn()
    await getContacts()
    setLocations(await getAllLocationActive())
    setData(eventsExpress)
    setLoading(false)
  }

  const getContacts = async () => {
    const contactsData = await getAllContactUser()
    setContacts(contactsData.map(e => ({ ...e, name: `${capitalize(e.firstName)} ${capitalize(e.lastName)}` })))
  }

  return (
    <>
      <MainLayout
        create={
          <>
            {actualPermission?.create && (
              <CreateEventExpressModal
                getContacts={getContacts}
                translationsContact={localizationContact.translations}
                contacts={contacts}
                translations={localization.translations}
                locations={locations}
              />
            )}
          </>
        }
        getData={getData}
        lang={lang}
        title={localization?.translations.titleSection}
      >
        <>
          <TableDatas
            columns={columns({
              translations: localization.translations,
              actualPermission: actualPermission as PermissionsPrivilege,
              permision: permission,
              lang: lang,
              locations: locations,
              after: () => {},
              contacts
            })}
            data={data}
            loading={loading}
            pagination={{
              pageSize: 10,
              size: 'default',
              total: data.length
            }}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(EventExpress)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'eventExpress')
  const localizationContact = getLocalizationProps(ctx, 'contact')
  return {
    props: {
      localization,
      localizationContact
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
