import 'App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import BasicGrid from './components/Grid';

export default function App() {
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios.get('/api/status')
      .then((res) => {
        console.log('RES: ', res)
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ error: err.message });
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello React World</h1>

      <section>
        {!status.error &&
          <>API Data: <code>{status.version}</code></>}
        {status.error &&
          <>API Error: <code>{status.error}</code></>}
      </section>
      <div>
        <Button variant="contained">Hello World</Button>
      </div>

      <BasicGrid />
    </div>
  );
}