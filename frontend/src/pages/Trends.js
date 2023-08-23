import { Suspense,useState, useEffect } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import TrendsLog from '../components/TrendsLog';

const TrendsPage = () => {
    const { logs } = useLoaderData();

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

export function loader() {
  return defer({
    logs: statsLogs(),
  });
}