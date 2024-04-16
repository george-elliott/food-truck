import App from './App';

export default async function Home() {
  const resp = await fetch('http://localhost:3000/')
  const json = await resp.json();

  return (
    <App json={json} />
  );
};
