import React from 'react'
import QrCode from 'qrcode.react'
const qr = ({ id, value, hasMask }: { id: string; value: string; hasMask?: boolean }) => {
  return (
    <span style={{ position: 'relative' }} id={id}>
      {hasMask && (
        <div className={'mask'}>
          <div className={'text'}>
            <h1>Código invalido</h1>
          </div>
        </div>
      )}
      <QrCode value={value} size={300} level={'M'} />
    </span>
  )
}

export default React.memo(qr)
