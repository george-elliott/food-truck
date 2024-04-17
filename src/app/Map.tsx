import MapGL, {Source, Layer} from 'react-map-gl';
import {Truck} from './types';
import type {CircleLayer} from 'react-map-gl';
import type {FeatureCollection} from 'geojson';
const TOKEN = 'pk.eyJ1IjoiZ2VlaGF3cyIsImEiOiJjbHYxa3VrcWYwMW9hMnBsamg2N3dkaThkIn0.vpOSGmcmYoHZxb2cTB7cgQ';

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 11,
    'circle-color': '#007cbf'
  }
};

const getData = (truck: Truck) => {
  const geojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(truck.longitude), parseFloat(truck.latitude)],
        },
        properties: {},
      }
    ]
  };

  return geojson;
}

interface Props {
  trucks: Truck[];
  location: {
    latitude: number;
    longitude: number;
  }
}

export default function Map(props: Props) {
  const {trucks, location} = props;
  const first = trucks[0]
  return (
    <MapGL
      mapboxAccessToken={TOKEN}
      initialViewState={{
        ...location,
        zoom: 13,
      }}
      style={{width: 400, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      { trucks.map((truck, i) => (
        <Source key={i} id={truck.applicant} type="geojson" data={getData(truck)}>
          <Layer {...layerStyle} />
        </Source>
      ))}
    </MapGL>
  );
}