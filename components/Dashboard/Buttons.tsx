import useSecurity from '@/providers/SecurityContext'
import { ILocation } from '@/types/types'
import { Card, Select } from 'antd'
import React from 'react'
import ChangeView from './ChangeView'

const Buttons = () => {
  const { selectedLocation, setSelectedLocation, invitations, entries, locations, actualEvents } = useSecurity()
  const inEntries = entries.filter(e => (e.hourIn ? true : false)).length
  const out = entries.filter(e => (e.hourOut ? true : false)).length
  return (
    <div className="buttonsHeader">
      <div className="controls">
        <div className="selectLocation">
          <p>Locación actual:</p>
          <Select
            showSearch
            style={{ width: '400px' }}
            value={selectedLocation?._id}
            defaultValue={locations[0]?._id}
            allowClear={false}
            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            onChange={value => setSelectedLocation(locations?.find(e => e._id === value) as ILocation)}
          >
            {locations?.map(e => (
              <Select.Option key={e._id} value={e._id}>
                {e.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <ChangeView />
      </div>

      <div className="cardContainerDash">
        <Card title="Eventos totales" size="small" className="card">
          <p>{actualEvents.length}</p>
        </Card>
        <Card title="Total invitados" size="small" className="card">
          <p> {invitations.length}</p>
        </Card>
        <Card title="Total ingresos" size="small" className="card">
          <p> {inEntries}</p>
        </Card>
        <Card title="Total egresos" size="small" className="card">
          <p>{out} </p>
        </Card>
        <Card title="Total personas adentro" size="small" className="card">
          <p> {inEntries - out}</p>
        </Card>
      </div>
    </div>
  )
}

export default Buttons
