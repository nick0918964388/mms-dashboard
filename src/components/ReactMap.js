import React, { useState, useEffect } from 'react';
//import { Map, Marker,Draggable  } from "pigeon-maps"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// const MAPBOX_TOKEN = 'pk.eyJ1Ijoibmlja2FsbCIsImEiOiJja2xodW1qdnIxZTB5Mm9wbW5yZjZqeXBzIn0.jS80fPRWMsHeMpZ0tC0C-Q'; // Set your mapbox token here
const ReactMap = () => {
  const position = [51.505, -0.09];
  const markerPositions = [
    [51.5, -0.09],
    [51.51, -0.1],
    [51.52, -0.11],
  ];

  return (
    <Map center={position} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Group marker
        </Popup>
      </Marker>
      {markerPositions.map((pos) => (
        <Marker position={pos} />
      ))}
    </Map>
  );


}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ReactMap, comparisonFn);
