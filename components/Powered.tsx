import React from 'react'

const Powered = (props: { theme: string }) => {
  return (
    <div className="powered">
      <span>Powered by</span>
      <img src={props.theme === '-dark' ? '/logowhite.png' : '/logoblack.png'} alt="aidea sas" />
    </div>
  )
}

export default React.memo(Powered)
