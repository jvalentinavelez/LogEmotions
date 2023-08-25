import React from 'react';
import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/auth/AuthForm';

const AuthenticationPage = () => {
  return <AuthForm />;
}

export default AuthenticationPage;

// Define the action function to handle user authentication
export async function action({ request }) {

  // Extract the 'mode' parameter from the URL query
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  // Check if the mode is supported (either 'login' or 'signup')
  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

   // Send a POST request to the appropriate endpoint based on the mode
  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  // Determine the user ID based on the mode
  let userId= '';
  if (mode == 'login'){    
    userId = resData.userId; 
  }
  if (mode == 'signup'){
    userId = resData.user.id; 
  }

  // Store the token, expiration, and user ID in localStorage
  localStorage.setItem('token', token);
  
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);

  localStorage.setItem('expiration', expiration.toISOString());
  localStorage.setItem('userId', userId);

  return redirect('/');
}
