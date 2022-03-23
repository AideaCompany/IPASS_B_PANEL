import { Translations } from '@/i18n/types'
import useLocation from '@/providers/LocationContext'
import { ILocation } from '@/types/types'
import lodash from 'lodash'
import React, { useEffect, useState } from 'react'
import ManageLocationChild from './ManageLocationChild'
import ManageLocationParent from './ManageLocationParent'
const adminsLocationForm = ({ translate }: { translate: Translations }) => {
  const { locations } = useLocation()
  const [parentLocation, setParentLocation] = useState(locations)
  const [selectedParent, setSelectedParent] = useState<string[]>([])
  const [childLocation, setChildLocation] = useState(locations)
  const [selectedChild, setSelectedChild] = useState<string[]>([])

  useEffect(() => {
    const state = lodash.difference(
      locations.map(e => e?._id),
      selectedParent
    )
    const newChild = state?.map(e => locations?.find(e1 => e1?._id === e))
    setChildLocation(newChild as ILocation[])
  }, [selectedParent])

  useEffect(() => {
    const state = lodash.difference(
      locations?.map(e => e?._id),
      selectedChild
    )
    const newParent = state.map(e => locations?.find(e1 => e1?._id === e))
    setParentLocation(newParent as ILocation[])
  }, [selectedChild])

  return (
    <>
      <ManageLocationParent locations={parentLocation} setSelectedLocations={setSelectedParent} translate={translate} />
      <ManageLocationChild locations={childLocation} setSelectedLocations={setSelectedChild} translate={translate} />
    </>
  )
}

export default React.memo(adminsLocationForm)
