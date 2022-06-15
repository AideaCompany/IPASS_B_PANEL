// Google maps and geocode
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
const mapContainerStyle = {
  width: '100%',
  height: '100%'
}
const apiKey = process.env.NEXT_PUBLIC_MAPS_KEY

const SelectInMap = ({
  currentLoc,
  onChangeCurrentLocation
}: {
  currentLoc: google.maps.LatLngLiteral
  onChangeCurrentLocation: (value: google.maps.LatLngLiteral) => void
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey as string
  })

  const [markers, setMarkers] = useState({
    lat: currentLoc.lat,
    lng: currentLoc.lng
  })

  useEffect(() => {
    if (loadError) {
      console.error('Error con mapa', loadError)
    }
  }, [loadError])

  const onChange = (event: google.maps.MapMouseEvent) => {
    setMarkers({
      lat: event?.latLng?.lat() as number,
      lng: event?.latLng?.lng() as number
    })
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
              center={currentLoc}
              options={{
                fullscreenControl: false,
                clickableIcons: true,
                disableDefaultUI: false
              }}
              onClick={event => {
                onChange(event)
              }}
            >
              <Marker position={markers}></Marker>
            </GoogleMap>
          </div>
        </>
      )}
    </>
  )
}

export default SelectInMap
