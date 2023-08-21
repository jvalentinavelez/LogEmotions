import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import LogsList from '../components/LogsList';


const EntriesPage = () => {
    const { logs } = useLoaderData();
  
    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={logs}>
          {(loadedLogs) => <LogsList logs={loadedLogs} />}
        </Await>
      </Suspense>
    );
}

export default EntriesPage;

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