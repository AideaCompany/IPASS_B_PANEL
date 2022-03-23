import FormFactory from '@/components/crudFunctions/FormFactory'
import { ThemeContext } from '@/providers/ThemeContext'
import useLocationView from '@/providers/ViewLocationContext'
import React, { useContext } from 'react'
import { formElementsSuperAdmin } from './formElementsSuperAdmin'

const InfoLocation = () => {
  const { theme } = useContext(ThemeContext)
  const { translate, devices } = useLocationView()

  // const getData = async () => {
  //   const devices = await getAvailableDevices()
  //   const actualDevs = [...devices, actualDevice]
  //   setDevices(actualDevs)
  // }
  // useEffect(() => {
  //   getData()
  // }, [])
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <FormFactory isUpdate={true} formElements={formElementsSuperAdmin(devices)} theme={theme} translate={translate} />
    </div>
  )
}

export default React.memo(InfoLocation)
