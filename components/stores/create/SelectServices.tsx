import { IService } from '@/types/interfaces/services/Services.interface'
import { IServiceType } from '@/types/interfaces/ServiceType/serviceType.interface'
import { Card, Checkbox } from 'antd'
import { useEffect, useState } from 'react'

const SelectServices = ({
  services,
  setSelectedServices,
  inicialValues
}: {
  services: IServiceType[]
  setSelectedServices: (value: string[]) => void
  inicialValues?: IService[]
}) => {
  const [valuesServices, setValuesServices] = useState([])

  useEffect(() => {
    const final = {}
    for (let k = 0; k < services.length; k++) {
      //@ts-ignore
      final[services[k]._id] = inicialValues?.filter(l => (l.type as IServiceType)?._id === services[k]._id).map(x => x._id) ?? []
    }
    //@ts-ignore
    setValuesServices(final)
  }, [])

  useEffect(() => {
    setSelectedServices(
      //@ts-ignore
      Object.values(valuesServices)
        //@ts-ignore
        .filter(e => e.length)
        .flat()
    )
  }, [valuesServices])

  return (
    <div className="selectService">
      {services.map((service, i) => (
        <Card key={i} title={service.name} style={{ width: 300, margin: 10 }}>
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
