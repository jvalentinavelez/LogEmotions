
import  React, {useState} from 'react';

import { LocalizationProvider, PickersDay, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Badge } from "@mui/material";


import img1 from '../../assets/images/emotions/rad.png';
import img2 from '../../assets/images/emotions/smile.png';
import img3 from '../../assets/images/emotions/neutral.png';
import img4 from '../../assets/images/emotions/sad.png';
import img5 from '../../assets/images/emotions/awful.png';

import classesCL from './CalendarLogs.module.css';


const CalendarLogs = ({logs}) => {

    const [value, setValue] = useState(new Date());

    const emotionImages = {
        rad: img1,
        happy: img2,
        neutral: img3,
        sad: img4,
        awful: img5,
    };

    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    className={classesCL.calendarDate}
                    orientation="landscape"
                    value={value}
                    disableFuture
                    showToolbar={false}
                    classes={{ toolbarTitle: classesCL.customTitle }} 
                    componentsProps={{ 
                      actionBar: {
                        actions: [],
                      }
                    }}
                    onChange={(newValue) => setValue(newValue)}
                    slots={{
                        day: (props) => {
                            const matchingDates = logs.filter(date => date.date === props.day.toISOString().substring(0, 10));
                            const badgeContent = matchingDates.map(date => (
                              <img
                                key={date.id}
                                src={emotionImages[date.selectedEmotion]}
                                alt={`Day ${props.day.getDate()}`}
                                className={classesCL.badgeIcon}
                              />
                            ));
                            const { today, ...otherProps } = props;
                  
                            return (
                              <Badge
                                key={props.day.toString()}
                                overlap="circular"
                                badgeContent={badgeContent.length > 0 ? badgeContent : undefined}
                              >
                                <PickersDay {...otherProps} />
                              </Badge>
                            );
                    },
                    }}
                />
            </LocalizationProvider>
        </>    
    )
}

export default CalendarLogs