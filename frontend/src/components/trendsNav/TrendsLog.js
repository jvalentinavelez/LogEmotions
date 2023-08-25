import classes from './TrendsLog.module.css';
import React, { useState, useEffect } from 'react';
import { useLoaderData, defer } from 'react-router-dom';

import EmotionChart from './EmotionChart';
import CalendarLogs from './CalendarLogs';
import AnalysisResume from './AnalysisResume';

const TrendsLog = ({logs}) => {

  const analysisAI = logs.map(log => log.sentiment);
  const { emotions } = useLoaderData();

  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (logs.length > 0) { 
      if (emotions && emotions.summary) {
        setSummary(emotions.summary);
      } else {
        loadSummary(analysisAI);
      }
    }
  }, [logs]);

  const loadSummary = async emotionsData => {
      try {
        const response = await fetch('http://localhost:8080/emotions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emotions: emotionsData, 
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch summary.');
        }
  
        const responseData = await response.json();
        const summaryData = responseData.summary;
  
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

  return(
    <>
      <h1 className={classes.trends}>Over Time Log</h1>
      <div className={classes.statsContainer}>
          <CalendarLogs logs={logs} />
          <EmotionChart logs={logs} />
      </div>
      <div className={classes.analysisResume}>
          <AnalysisResume summary={summary} />
      </div>
    </>    
  )
}

export function loader() {
    return defer({
      emotions: {},
    });
  }
  
export default TrendsLog;

  
