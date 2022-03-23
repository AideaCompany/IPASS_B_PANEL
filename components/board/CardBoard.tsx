import { iGeneralAnalythics } from '@/types/types'
import { Card } from 'antd'
import React from 'react'

const CardBoard = ({ generalAnalythics }: { generalAnalythics: iGeneralAnalythics }) => {
  const { eventos, eventosExpress, incumplimientos } = generalAnalythics

  return (
    <div className="cardContainer">
      <Card title="Eventos ayer" size="small" className="card">
        <p>{eventos.yesterday}</p>
      </Card>
      <Card title="Eventos hoy" size="small" className="card">
        <p>{eventos.today}</p>
      </Card>
      <Card title="Eventos mañana" size="small" className="card">
        <p>{eventos.tomorrow}</p>
      </Card>
      <Card title="Eventos Express ayer" size="small" className="card">
        <p>{eventosExpress.yesterday}</p>
      </Card>
      <Card title="Eventos Express hoy" size="small" className="card">
        <p>{eventosExpress.today}</p>
      </Card>
      <Card title="Fuera de hora de ingreso" size="small" className="card">
        <p>0</p>
      </Card>
      <Card title="INC Ayer" size="small" className="card">
        <p>{incumplimientos.yesterday}</p>
      </Card>
      <Card title="INC Hoy" size="small" className="card">
        <p>{incumplimientos.today}</p>
      </Card>
      <Card title="SI" size="small" className="card">
        <p>{incumplimientos.si}</p>
      </Card>
    </div>
  )
}

export default CardBoard
