import classes from './TrendsLog.module.css';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const TrendsLog = () => {
    return(
        <>
        <h1 className={classes.trends}>Over Time Log</h1>
        <div className={classes.statsContainer}>
            {/* <div className={classes.row}> */}
                {/* <div className={classes.stat}>Stat 1 */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker orientation="landscape" />
                    </LocalizationProvider>
                {/* </div> */}
                {/* <div className={classes.stat}>Stat 2</div> */}
            {/* </div> */}
            {/* <div className={classes.stat}>Centered Stat</div> */}
        </div>
        </>    
    )
}

export default TrendsLog