import useSecurity from '@/providers/SecurityContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { ILocation, User } from '@/types/types'
import { getTime } from '@/utils/utils'
import { Modal } from 'antd'
import React, { useContext } from 'react'

const EventModal = (): JSX.Element => {
  const { theme } = useContext(ThemeContext)
  const { showEvent, setShowEvent, eventData, setEventData } = useSecurity()
  const handleClose = () => {
    setEventData(null)
    setShowEvent(false)
  }
  return (
    <>
      <Modal
        destroyOnClose
        onCancel={handleClose}
        onOk={handleClose}
        className={`modalCrud${theme}`}
        visible={showEvent}
        maskClosable={true}
        centered
        width={1200}
      >
        <div className="eventModal">
          <h2>Datos del evento</h2>
          <div className="info">
            <div className="element">
              <h3>{'Nombre del evento'}:</h3>
              <p>{eventData?.name}</p>
            </div>
            <div className="element">
              <h3>Horario Inicio:</h3>
              <p>{`${getTime(eventData?.start)}`}</p>
            </div>
            <div className="element">
              <h3>Horario Fin:</h3>
              <p>{`${getTime(eventData?.end)}`}</p>
            </div>
            <div className="element">
              <h3>Anfitrión:</h3>
              <p>{`${(eventData?.host as User)?.name} ${(eventData?.host as User)?.lastname}`}</p>
            </div>
            <div className="element">
              <h3>Email anfitrión:</h3>
              <p>{`${(eventData?.host as User)?.email}`}</p>
            </div>
            {/* <div className="element">
              <h3>Cantidad de invitados:</h3>
              <p>{`${(eventData?.host as User)?.email}`}</p>
            </div> */}
            <div className="element">
              <h3>Locación:</h3>
              <p>{`${(eventData?.location as ILocation)?.name}`}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(EventModal)
