import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../app/App';
import Button from '@mui/material/Button';
import { TextEncoder, TextDecoder } from 'util';
//Polyfill for react-map-gl
Object.assign(global, { TextDecoder, TextEncoder });
//Poly fill geo API
global.navigator.geolocation = {};
global.navigator.geolocation.getCurrentPosition = (fn) => fn({
  coords: {
    latitude: 30,
    longitude: 20,
  },
});

describe('App', () => {
  it('should render a button', () => {
    render(<App json={[]}/>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});