import  React from 'react';

import classes from './AnalysisResume.module.css';

const AnalysisResume = ({summary}) => {

    console.log(summary);

    return(
        <>
        <h2>Analysis Resume</h2>
        <div className={classes.summary}>{summary}
        </div>
        </>    
    )
}

export default AnalysisResume