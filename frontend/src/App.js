import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import AuthenticationPage, { action as authAction, } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader } from './utils/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
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
