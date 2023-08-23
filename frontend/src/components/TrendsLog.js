import classes from './TrendsLog.module.css';
import  React from 'react';

import EmotionChart from './EmotionChart';
import CalendarLogs from './CalendarLogs';
import AnalysisResume from './AnalysisResume';

const TrendsLog = ({logs}) => {

    return(
        <>
        <h1 className={classes.trends}>Over Time Log</h1>
        <div className={classes.statsContainer}>
            <CalendarLogs logs={logs} />
            <EmotionChart logs={logs} />
        </div>
        <div className={classes.analysisResume}>
          <AnalysisResume logs={logs} />
        </div>
        </>    
    )
}

export default TrendsLog