import { Link } from 'react-router-dom';
import { LocalizationProvider, PickersDay, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Badge, Typography } from "@mui/material";

import classes from './LogsList.module.css';

import { useState, useEffect } from 'react';

import img1 from '../assets/images/emotions/rad.png';
import img2 from '../assets/images/emotions/smile.png';
import img3 from '../assets/images/emotions/neutral.png';
import img4 from '../assets/images/emotions/sad.png';
import img5 from '../assets/images/emotions/awful.png';

const LogsList = ({logs})  => {

  const userId = localStorage.getItem('userId');

    const emotions = [
        { id: "rad", label: "rad", image: img1 },
        { id: "happy", label: "happy", image: img2 },
        { id: "neutral", label: "neutral", image: img3 },
        { id: "sad", label: "sad", image: img4 },
        { id: "awful", label: "awful", image: img5 },

    ];

    const [userLogs, setUserLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [selectedDate, setSelectedDate] = useState(null); // Add selectedDate state
    const [datesWithLogs, setDatesWithLogs] = useState([]); // Add this state


    useEffect(() => {
      const filteredLogs = logs.filter(
        (log) =>
          log.userId === userId &&
          (!selectedDate || log.date === selectedDate.toISOString().substring(0, 10))
      );
      setUserLogs(filteredLogs);
      setIsLoading(false);
    }, [logs, userId, selectedDate]); // Update when selectedDate changes

    const handleDateFilter = (date) => {
      setSelectedDate(date);
      setDatesWithLogs(date);
    };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className={classes.logs}>
      <h1>All Logs</h1>
      <p>Filter by date</p>
        <DatePicker
          label=""
          value={selectedDate || null}
          className={classes.dateInput}
          disableFuture
          showToolbar={true}
          onChange={(newValue) => handleDateFilter(newValue)}
          renderDay={(day, _, DayProps) => {
            const matchingDates = datesWithLogs.filter(date => date === day.toISOString().substring(0, 10));
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={matchingDates.length > 0 ? matchingDates.length : undefined}
                color="primary" // Add color to the badge
              >
                <PickersDay {...DayProps} />
              </Badge>
            );
          }}
      />
      {isLoading ? ( // Show loading message while fetching logs
        <p>Loading logs...</p>
      ) : userLogs.length === 0 ? (
        <div className={classes.item}>
            <p>No logs entered yet.</p>
            <p>Why not start by registering your daily emotions throughout the day?</p>
        </div>
        ) : (
        <ul className={classes.list}>
          {userLogs.map((log) => (
            <li key={log.id} className={classes.item}>
              {/* <Link to={`/logs/${log.id}`}> */}
              <Link>
              <img src={emotions.find(emotion => emotion.id === log.selectedEmotion)?.image}
              alt={log.selectedEmotion} />
                <div className={classes.content}>
                  <time>{log.date}</time>
                  <p>Notes: {log.notes}</p>
                  <p>Analysis: {log.sentiment ? log.sentiment : ''}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        )}
    </div>
     </LocalizationProvider>
  );
}

export default LogsList;
