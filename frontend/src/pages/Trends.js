import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import TrendsLog from '../components/trendsNav/TrendsLog';

const TrendsPage = () => {
  // Load logs using useLoaderData() hook
    const { logs } = useLoaderData();

  // Get the userId from local storage
    const userId = localStorage.getItem('userId');

    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={logs}>
          {(loadedLogs) => <TrendsLog logs={loadedLogs.filter(log => log.userId === userId)} />}
        </Await>
      </Suspense>
    );
}

export default TrendsPage;

// Function to fetch logs data from the server
async function statsLogs() {
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

// Loader function to fetch logs and return them as a promise
export function loader() {
  return defer({
    logs: statsLogs(),
  });
}