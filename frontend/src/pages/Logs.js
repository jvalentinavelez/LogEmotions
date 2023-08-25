import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import LogsList from '../components/logsNav/LogsList';


const EntriesPage = () => {
  // Load the logs using useLoaderData() hook
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
  // Fetch logs data from the API
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
    return resData.logs;
  }
}

// Define the loader function to fetch and return logs using defer
export function loader() {
  return defer({
    logs: loadLogs(),
  });
}