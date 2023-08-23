import classes from './TrendsLog.module.css';

import  React, {useState} from 'react';
import {
    LocalizationProvider,
    PickersDay,
    StaticDatePicker,
  } from "@mui/x-date-pickers";
  import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
  import { Badge } from "@mui/material";

  import img1 from '../assets/images/emotions/rad.png';
  import img2 from '../assets/images/emotions/smile.png';
  import img3 from '../assets/images/emotions/neutral.png';
  import img4 from '../assets/images/emotions/sad.png';
  import img5 from '../assets/images/emotions/awful.png';

  import EmotionChart from './EmotionChart';

const TrendsLog = ({logs}) => {

    const [value, setValue] = useState(new Date());

    const datesArray = logs.map(obj => obj.date);
    const daysArray = datesArray.map(dateString => {
        const date = new Date(dateString);
        return date.getUTCDate();
      });

    const [highlightedDays, setHighlightedDays] = useState(daysArray);

    const emotionImages = {
        rad: img1,
        happy: img2,
        neutral: img3,
        sad: img4,
        awful: img5,
    };

    return(
        <>
        <h1 className={classes.trends}>Over Time Log</h1>
        <div className={classes.statsContainer}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    className={classes.calendarDate}
                    orientation="landscape"
                    value={value}
                    disableFuture
                    onChange={(newValue) => setValue(newValue)}
                    slots={{
                        day: (props) => {
                            const matchingDates = logs.filter(date => date.date === props.day.toISOString().substring(0, 10));
                            const badgeContent = matchingDates.map(date => (
                              <img
                                key={date.id}
                                src={emotionImages[date.selectedEmotion]}
                                alt={`Day ${props.day.getDate()}`}
                                className={classes.badgeIcon}
                              />
                            ));
                  
                            return (
                              <Badge
                                key={props.day.toString()}
                                overlap="circular"
                                badgeContent={badgeContent.length > 0 ? badgeContent : undefined}
                              >
                                <PickersDay {...props} />
                              </Badge>
                            );
                    },
                    }}
                />
            </LocalizationProvider>
            <EmotionChart logs={logs} />
        </div>
        </>    
    )
}

export default TrendsLog