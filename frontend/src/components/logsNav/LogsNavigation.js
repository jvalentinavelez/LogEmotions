import {Outlet, NavLink, useRouteLoaderData, useNavigate } from 'react-router-dom';

import { useState } from 'react';

import classes from './LogsNavigation.module.css';

const LogsNavigation = () => {
  
  const token = useRouteLoaderData('root');
    const navigate = useNavigate();
  

  const handleAllLogsClick = () => {
    navigate('/logs');
  };

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
              onClick={handleAllLogsClick}
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