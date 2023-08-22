import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import TrendsLog from '../components/TrendsLog';

const TrendsPage = () => {
    const { logs } = useLoaderData();
  
    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={logs}>
          {(loadedLogs) => <TrendsLog logs={loadedLogs} />}
        </Await>
      </Suspense>
    );
}

export default TrendsPage;

async function loadLogs() {
  const response = await fetch('http://localhost:8080/logs');

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch logs.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.logs;
  }
}

export function loader() {
  return defer({
    logs: loadLogs(),
  });
}