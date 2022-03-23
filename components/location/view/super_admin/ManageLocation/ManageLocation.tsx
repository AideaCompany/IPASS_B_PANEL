import useLocationView from '@/providers/ViewLocationContext'
import React, { useEffect, useState } from 'react'
import ManageLocationChild from './ManageLocationChild'
import ManageLocationParent from './ManageLocationParent'
import lodash from 'lodash'
import { ILocation } from '@/types/types'
const ManageLocation = () => {
  const { locations, actualLocation } = useLocationView()
  const [parentLocation, setParentLocation] = useState(locations)
  const [selectedParent, setSelectedParent] = useState<string[]>(actualLocation.parentLocations as string[])
  const [childLocation, setChildLocation] = useState(locations)
  const [selectedChild, setSelectedChild] = useState<string[]>(actualLocation.childLocations as string[])

  useEffect(() => {
    const state = lodash.difference(
      locations.map(e => e._id),
      selectedParent
    )
    const newChild = state.map(e => locations.find(e1 => e1._id === e))
    setChildLocation(newChild as ILocation[])
  }, [selectedParent])

  useEffect(() => {
    const state = lodash.difference(
      locations.map(e => e._id),
      selectedChild
    )
    const newParent = state.map(e => locations.find(e1 => e1._id === e))
    setParentLocation(newParent as ILocation[])
  }, [selectedChild])

  return (
    <>
      <ManageLocationParent locations={parentLocation} setSelectedLocations={setSelectedParent} />
      <ManageLocationChild locations={childLocation} setSelectedLocations={setSelectedChild} />
    </>
  )
}

export default React.memo(ManageLocation)
