import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { Card, Checkbox } from 'antd'
import React from 'react'

const SelectServices = ({
  services,
  selectedServices,
  setSelectedServices
}: {
  services: IServiceType[]
  selectedServices: string[]
  setSelectedServices: (value: string[]) => void
}) => {
  return (
    <div className="selectService">
      {services.map(service => (
        <Card title={service.name} style={{ width: 300, margin: 10 }}>
          {service.services.length ? (
            <Checkbox.Group
              onChange={val => setSelectedServices(val as string[])}
              value={selectedServices}
              options={service.services.map(e => ({ label: e.name, value: e._id as string }))}
            />
          ) : (
            'No hay servicios'
          )}
        </Card>
      ))}
    </div>
  )
}

export default SelectServices
