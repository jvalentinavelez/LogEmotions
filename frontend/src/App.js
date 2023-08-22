import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import AuthenticationPage, { action as authAction, } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './utils/auth';

import EntriesPage, { loader as logsLoader } from './pages/Logs';
import LogsNavigation from './components/LogsNavigation';
import NewLogPage from './pages/NewLog';

import { action as manipulateEventAction} from './components/LogForm';

import TrendsPage from './components/TrendsLog';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'logs',
        element: <LogsNavigation />,
        children: [
          {
            index: true,
            element: <EntriesPage />,
            loader: logsLoader,
          },
          { 
            path: 'new',
            element: <NewLogPage/>,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ]
      },
      { 
        path: 'trends',
        element: <TrendsPage />,
      },
      { 
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
