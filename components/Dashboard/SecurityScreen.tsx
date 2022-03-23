import { Translations } from '@/i18n/types'
import useSecurity from '@/providers/SecurityContext'
import { getAllToSecurityFn, subscribeSecurity } from '@/services/locations'
import { ILocation, ILocationEntries } from '@/types/types'
import React, { useEffect } from 'react'
import Buttons from './Buttons'
import EventModal from './EventModal'
import InvitationsModal from './InvitationsModal'
import ManageView from './ManageView'
import ModalContact from './ModalContact'

let uns: any

const SecurityScreen = ({ translate }: { translate: Translations }) => {
  const { selectedLocation, setActualEvents, setInvitations, setEntries, setLastEntries } = useSecurity()
  useEffect(() => {
    ;(async () => {
      if (selectedLocation) {
        getData()
        uns = subscribeSecurity(selectedLocation._id, () => {
          getData()
        })
      }
    })()
    return () => {
      if (uns && uns.unsubscribe) {
        uns.unsubscribe()
      }
    }
  }, [selectedLocation])

  const getData = async () => {
    const data = await getAllToSecurityFn((selectedLocation as ILocation)._id as string)
    const entries = data.entries as ILocationEntries[]
    setActualEvents([...data.events, ...data.eventsExpress.map((e: any) => ({ ...e, express: true }))].reverse())
    setInvitations(data.invitations)
    setEntries(entries)
    setLastEntries(entries[0])
  }
  return (
    <div>
      <Buttons />
      <ManageView translate={translate} />
      <EventModal />
      <InvitationsModal />
      <ModalContact />
    </div>
  )
}

export default SecurityScreen
