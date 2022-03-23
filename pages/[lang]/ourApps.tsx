import React from 'react'

const ourApps = () => {
  const goTo = (val: string) => {
    window.location.href = val
  }
  return (
    <div className="ourAppsContainer">
      <div className="ourApps">
        <h1>Te invitamos a descargar nuestra app disponible en :</h1>
        <div className="icons">
          <img onClick={() => goTo('https://apps.apple.com/co/app/ipass-renap-plus/id1598996724?l=en')} className="imageIcon" src={'/appStore.png'} />
          <img
            onClick={() => goTo('https://play.google.com/store/apps/details?id=gt.ipassrenap.app')}
            className="imageIcon"
            src={'/googlePlay.png'}
          />
          <img onClick={() => goTo('https://appgallery.huawei.com/app/C105190081')} className="imageIcon" src={'/appGallery.png'} />
        </div>
      </div>
    </div>
  )
}

export default ourApps
