import { Link } from 'react-router-dom';

import classes from './LogsList.module.css';

import img1 from '../assets/images/emotions/rad.png';
import img2 from '../assets/images/emotions/smile.png';
import img3 from '../assets/images/emotions/neutral.png';
import img4 from '../assets/images/emotions/sad.png';
import img5 from '../assets/images/emotions/awful.png';

const LogsList = ({logs})  => {

  console.log(logs)

    const emotions = [
        { id: "rad", label: "rad", image: img1 },
        { id: "happy", label: "happy", image: img2 },
        { id: "neutral", label: "neutral", image: img3 },
        { id: "sad", label: "sad", image: img4 },
        { id: "awful", label: "awful", image: img5 },

      ];

  return (
    <div className={classes.logs}>
      <h1>All Logs</h1>
      {logs.length === 0 ? (
        <div className={classes.item}>
            <p>No logs entered yet.</p>
            <p>Why not start by registering your daily emotions throughout the day?</p>
        </div>
        ) : (
      <ul className={classes.list}>
        {logs.map((log) => (
          <li key={log.id} className={classes.item}>
            <Link to={`/logs/${log.id}`}>
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
      </ul>)}
    </div>
  );
}

export default LogsList;
