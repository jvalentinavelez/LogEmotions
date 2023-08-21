import { Suspense } from 'react';
import { Link, Form, useLoaderData, json, defer, Await } from 'react-router-dom';

import LogForm from '../components/LogForm';


const EntriesPage = () => {
    //const { entries } = useLoaderData();
  
    return (
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await>
          <>
            <LogForm method="post" />
          </>
        </Await>
      </Suspense>
    );
}

export default EntriesPage;