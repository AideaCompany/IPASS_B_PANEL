import { Translations } from '@/i18n/types'
import { getAllLocationActive } from '@/services/locations'
import React, { useContext, useEffect, useState } from 'react'
import { IContact, IEvent, IEventExpress, IInvitationEvent, ILocation, ILocationEntries } from '../types/types'
type SecurityContext = {
  locations: ILocation[]
  selectedLocation: ILocation | null
  setSelectedLocation: React.Dispatch<React.SetStateAction<ILocation | null>>
  translate: Translations
  lang: string
  view: 'default' | 'list'
  setView: React.Dispatch<React.SetStateAction<'default' | 'list'>>
  actualEvents: IEvent[]
  setActualEvents: React.Dispatch<React.SetStateAction<IEvent[]>>
  showEvent: boolean
  setShowEvent: React.Dispatch<React.SetStateAction<boolean>>
  eventData: IEvent | null | IEventExpress
  setEventData: React.Dispatch<React.SetStateAction<IEvent | IEventExpress | null>>
  invitations: IInvitationEvent[]
  setInvitations: React.Dispatch<React.SetStateAction<IInvitationEvent[]>>
  showInvitation: boolean
  setShowInvitation: React.Dispatch<React.SetStateAction<boolean>>
  invitationData: IInvitationEvent[]
  setInvitationData: React.Dispatch<React.SetStateAction<IInvitationEvent[]>>
  showContact: boolean
  setShowContact: React.Dispatch<React.SetStateAction<boolean>>
  contactData: IContact | null
  setContactData: React.Dispatch<React.SetStateAction<IContact | null>>
  entries: ILocationEntries[]
  setEntries: React.Dispatch<React.SetStateAction<ILocationEntries[]>>
  lastEntries: ILocationEntries | null
  setLastEntries: React.Dispatch<React.SetStateAction<ILocationEntries | null>>
}

const SecurityContext = React.createContext<SecurityContext>({} as SecurityContext)

export const SecurityProvider = (props: { children: JSX.Element; lang: string; translate: Translations }) => {
  //props
  const { children, translate, lang } = props
  //states
  const [view, setView] = useState<'default' | 'list'>('default')
  const [actualEvents, setActualEvents] = useState<IEvent[]>([])
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null)
  const [locations, setLocations] = useState<ILocation[]>([])
  const [showEvent, setShowEvent] = useState<boolean>(false)
  const [eventData, setEventData] = useState<IEvent | null | IEventExpress>(null)
  const [invitations, setInvitations] = useState<IInvitationEvent[]>([])
  const [showInvitation, setShowInvitation] = useState<boolean>(false)
  const [invitationData, setInvitationData] = useState<IInvitationEvent[]>([])
  const [showContact, setShowContact] = useState(false)
  const [contactData, setContactData] = useState<IContact | null>(null)
  const [entries, setEntries] = useState<ILocationEntries[]>([])
  const [lastEntries, setLastEntries] = useState<ILocationEntries | null>(null)
  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    const locationsGet = await getAllLocationActive()
    setLocations(locationsGet)
    setSelectedLocation(locationsGet[0])
  }
  return (
    <SecurityContext.Provider
      value={{
        lastEntries,
        setLastEntries,
        entries,
        setEntries,
        contactData,
        setContactData,
        showContact,
        setShowContact,
        invitationData,
        setInvitationData,
        showInvitation,
        setShowInvitation,
        invitations,
        setInvitations,
        view,
        actualEvents,
        eventData,
        showEvent,
        setEventData,
        setShowEvent,
        setActualEvents,
        setView,
        locations,
        selectedLocation,
        translate,
        lang,
        setSelectedLocation
      }}
    >
      {children}
    </SecurityContext.Provider>
  )
}

export default function useSecurity() {
  return useContext(SecurityContext)
}
