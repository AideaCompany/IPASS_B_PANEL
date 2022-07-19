// Google maps and geocode
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { useEffect, useState } from 'react'
const mapContainerStyle = {
  width: '100%',
  height: '100%'
}
const apiKey = process.env.NEXT_PUBLIC_MAPS_KEY

const SelectInMap = ({
  currentLoc,
  onChangeCurrentLocation,
  inicial
}: {
  currentLoc: google.maps.LatLngLiteral
  onChangeCurrentLocation: (value: google.maps.LatLngLiteral) => void
  inicial: google.maps.LatLngLiteral
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey as string
  })

  const [center] = useState({
    lat: currentLoc.lat,
    lng: currentLoc.lng
  })

  useEffect(() => {
    if (loadError) {
      console.error('Error con mapa', loadError)
    }
  }, [loadError])

  const onChange = (event: google.maps.MapMouseEvent) => {
    onChangeCurrentLocation({
      lat: event?.latLng?.lat() as number,
      lng: event?.latLng?.lng() as number
    })
  }

  return (
    <>
      {isLoaded && (
        <>
          <div style={{ width: '100%', height: '400px' }}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={{
                fullscreenControl: false,
                clickableIcons: true,
                disableDefaultUI: false
              }}
              onClick={event => {
                onChange(event)
              }}
            >
              <Marker position={currentLoc}></Marker>
            </GoogleMap>
          </div>
        </>
      )}
    </>
  )
}

export default SelectInMap
