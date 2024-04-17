'use client';
import Button from '@mui/material/Button';
import {useState, useMemo, useEffect} from "react";
import Map from './Map';
import haversine from 'haversine';
import _ from 'lodash';
import {Truck} from './types';
import moment from 'moment';
import Table from './Table';
import CircularProgress from '@mui/material/CircularProgress';

const DAYS: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

interface Props {
  json: Truck[];
}

export default function App(props: Props) {
  const {json} = props;
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(() => {
    //Get current position or use mock location in San Francisco
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        longitude: -122.4,
        latitude: 37.8,
      });
    }, () => {
      // Error
      setLocation({
        longitude: -122.4,
        latitude: 37.8,
      })
    });
  }, []);

  //Memoize the three closest trucks to current location
  const closest = useMemo(() => {
    //Calculate the haversine distance
    const mapped = json.map(truck => {
      const end = {
        longitude: parseFloat(truck.longitude),
        latitude: parseFloat(truck.latitude),
      };

      return {
        ...truck,
        distance: haversine(location, end),
      }
    });

    //Filter trucks open now and within 5 miles
    const filtered = mapped.filter(truck => {
      const now = moment();
      const start = moment(truck.starttime, 'ha');
      const end = moment(truck.endtime, 'ha');
      return truck.dayofweekstr === DAYS[moment().day()] &&
        now.isBetween(start, end) &&
        truck.distance <= 5;
    });

    //Sort by distance
    const sorted =  _.sortBy(filtered, 'distance');
    return sorted.slice(0, 3);
  }, [location, json]);

  return (
    <div className='h-full w-full justify-center items-center flex'>
      { !isOpen &&
        <Button variant="contained" onClick={()=> setIsOpen(true)}>
          Find Open Food Trucks Now
        </Button>
      }
      {
        isOpen && location.longitude && location.latitude &&
        <div className='h-full'>
          <Map trucks={closest} location={location}/>
          <Table trucks={closest} />
        </div>
      }
      {
        isOpen && !location.longitude && !location.latitude &&
        <CircularProgress />
      }
    </div>
  );
}