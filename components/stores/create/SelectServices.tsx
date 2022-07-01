import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { Card, Checkbox } from 'antd'
import { useEffect, useState } from 'react'

const SelectServices = ({ services, setSelectedServices }: { services: IServiceType[]; setSelectedServices: (value: string[]) => void }) => {
  const [valuesServices, setValuesServices] = useState(services.map(e => ({ [e._id as string]: [] })))

  useEffect(() => {
    setSelectedServices(
      //@ts-ignore
      Object.values(valuesServices)
        .filter(e => e.length)
        .flat()
    )
  }, [valuesServices])

  return (
    <div className="selectService">
      {services.map(service => (
        <Card title={service.name} style={{ width: 300, margin: 10 }}>
          {service.services.length ? (
            <Checkbox.Group
              name={service._id as string}
              onChange={val => {
                setValuesServices(current => ({ ...current, [service._id as string]: val }))
              }}
              //@ts-ignore
              value={valuesServices[service._id as string]}
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
