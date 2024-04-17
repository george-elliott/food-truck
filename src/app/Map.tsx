import MapGL, {Marker} from 'react-map-gl';
import {Truck, Location} from './types';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = 'pk.eyJ1IjoiZ2VlaGF3cyIsImEiOiJjbHYxa3VrcWYwMW9hMnBsamg2N3dkaThkIn0.vpOSGmcmYoHZxb2cTB7cgQ';

interface Props {
  trucks: Truck[];
  location: Location;
}

export default function Map(props: Props) {
  const {trucks, location} = props;
  const first = trucks[0];

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
        <Marker
          key={i}
          longitude={parseFloat(truck.longitude)}
          latitude={parseFloat(truck.latitude)}
          anchor='bottom'/>

      ))}
    </MapGL>
  );
}