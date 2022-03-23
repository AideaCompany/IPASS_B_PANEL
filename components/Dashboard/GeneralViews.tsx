import React from 'react'
import Events from './Events'
import LastEntry from './LastEntry'
import UserCard from './UserCard'

const GeneralViews = () => {
  return (
    <div className="panelContainer">
      <div className="panel">
        <div className="left">
          <Events />
        </div>
        <div className="left">
          <LastEntry />
        </div>
      </div>
      <div className="panel">
        <div className="right">
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default GeneralViews
