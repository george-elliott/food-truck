'use client';
import Button from '@mui/material/Button';
import {useState, useMemo} from "react";
import Map from './Map';
import haversine from 'haversine';
import _ from 'lodash';
import {Truck} from './types';
import moment from 'moment';
import Table from './Table';

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

  const start = {
    longitude: -122.4,
    latitude: 37.8,
  };

  //Memoize the three closest trucks to `start`
  const closest = useMemo(() => {
    const mapped = json.map(truck => {
      const end = {
        longitude: parseFloat(truck.longitude),
        latitude: parseFloat(truck.latitude),
      };

      return {
        ...truck,
        distance: haversine(start, end),
      }
    })
    const filtered = mapped.filter(truck => {
      const now = moment();
      const start = moment(truck.starttime, 'ha');
      const end = moment(truck.endtime, 'ha');
      return truck.dayofweekstr === DAYS[moment().day()] &&
        now.isBetween(start, end);
    });

    const sorted =  _.sortBy(filtered, 'distance');
    return sorted.slice(0, 3);
  }, [])
  return (
    <div className='h-full w-full justify-center items-center flex'>
      { !isOpen &&
        <Button variant="contained" onClick={()=> setIsOpen(true)}>
          Find Open Food Trucks Now
        </Button>
      }
      {
        isOpen &&
        <div>
          <Map trucks={closest}/>
          <Table trucks={closest} />
        </div>
      }
    </div>
  );
}