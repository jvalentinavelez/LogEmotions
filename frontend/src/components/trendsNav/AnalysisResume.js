import  React from 'react';

import classes from './AnalysisResume.module.css';

import img1 from '../../../src/assets/images/emotions/curious.png';
import img2 from '../../../src/assets/images/emotions/cowboy.png';
import img3 from '../../../src/assets/images/emotions/pointing-right.png';

const AnalysisResume = ({summary}) => {

    return(
        <>
        <div className={classes.analysisContainer}>
            <h2 className={classes.analysisTitle}>Analysis Resume </h2>
            <div className={classes.analysisSummary}>
                <p>Explore the summarized analysis of your emotions 
                <span className={classes.emoji}><img src={img2} alt="Cowboy" /></span>
                    over time 
                </p>
                <p>Gain insights  
                    <span className={classes.emoji}><img src={img1} alt="Curious" /></span>
                    into the patterns and trends of your feelings, helping you better 
                    understand your emotional journey </p>
            </div>
            <div className={classes.analysisContent}>
                <span className={classes.emoji}><img src={img3} alt="Pointing Right" /></span>
                <strong>Resume: </strong> {summary}
                
            </div>
        </div>
        </>    
    )
}

export default AnalysisResume