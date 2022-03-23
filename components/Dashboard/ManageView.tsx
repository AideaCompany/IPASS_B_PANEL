import { Translations } from '@/i18n/types'
import useSecurity from '@/providers/SecurityContext'
import React from 'react'
import GeneralViews from './GeneralViews'
import ListViews from './ListViews'

const ManageView = ({ translate }: { translate: Translations }) => {
  const { view } = useSecurity()
  return <div>{view === 'default' ? <GeneralViews /> : <ListViews translate={translate} />}</div>
}

export default ManageView
