import {Outlet, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './LogsNavigation.module.css';

const LogsNavigation = () => {
  const token = useRouteLoaderData('root');

  return (
    <>
          <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/logs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Logs
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                to="/logs/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Log
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
    <Outlet />
    </>
    

  );
}

export default LogsNavigation;