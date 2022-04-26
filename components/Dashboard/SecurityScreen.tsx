import { ITranslations } from '@/i18n/types'
import useSecurity from '@/providers/SecurityContext'
import { getAllToSecurityFn, subscribeSecurity } from '@/services/locations'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import React, { useEffect } from 'react'

let uns: any

const SecurityScreen = ({ translate }: { translate: ITranslations }) => {
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
    const data = await getAllToSecurityFn((selectedLocation as ILocation)._id)
    const entries = data.entries as ILocationEntries[]
    setActualEvents([...data.events, ...data.eventsExpress.map((e: any) => ({ ...e, express: true }))].reverse())
    setInvitations(data.invitations)
    setEntries(entries)
    setLastEntries(entries[0])
  }
  return (
    <div>
      {/* <Buttons />
      <ManageView translate={translate} />
      <EventModal />
      <InvitationsModal />
      <ModalContact /> */}
    </div>
  )
}

export default SecurityScreen
