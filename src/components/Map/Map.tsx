import React, { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import Map, { Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const NavControl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
`

interface IHouse {
  id: number
  latitude: number
  longitude: number
}

interface ILocation {
  latitude: number
  longitude: number
}

interface IProps {
  nearbyBusinesses: IHouse[]
  chosenLocation: ILocation
}

function SingleMap({ nearbyBusinesses, chosenLocation }: IProps) {
  const [viewport, setViewport] = useState({
    latitude: chosenLocation.latitude,
    longitude: chosenLocation.longitude,
    zoom: 15,
  })

  return (
    <Map
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      scrollZoom={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      style={{ width: '50vw', height: '80vh', margin: '0' }}
    >
      <NavControl>
        <NavigationControl showCompass={false} />
      </NavControl>
      {nearbyBusinesses.map((near) => (
        <Marker
          key={near.id}
          latitude={near.latitude}
          longitude={near.longitude}
        >
          <Link href={`/business/${near.id}`}>
            <a style={{ width: '30px', height: '30px', fontSize: '30px' }}>
              <Image
                src="/salon-icon.png"
                width="30"
                height="30"
                className="w-8"
                alt="nearby house"
              />
            </a>
          </Link>
        </Marker>
      ))}
    </Map>
  )
}

export default SingleMap
