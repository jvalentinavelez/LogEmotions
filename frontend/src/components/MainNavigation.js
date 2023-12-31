import React from 'react';
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {!token && (
            <>
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Log in / Register
                </NavLink>
              </li>
            </>            
          )}
          {token && (
            <>
              <li>
                <NavLink to="/logs"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  How am I feeling? 
                </NavLink>
              </li>
              <li>
                <NavLink to="/trends"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Over time Log
                </NavLink>
              </li>
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;