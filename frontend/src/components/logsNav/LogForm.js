import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    json
} from 'react-router-dom';

import { useState } from 'react';
import { getAuthToken } from '../../utils/auth';
import classes from './LogForm.module.css';


import img1 from '../../assets/images/emotions/rad.png';
import img2 from '../../assets/images/emotions/smile.png';
import img3 from '../../assets/images/emotions/neutral.png';
import img4 from '../../assets/images/emotions/sad.png';
import img5 from '../../assets/images/emotions/awful.png';

const LogForm = ({ method, log }) => {
    const data = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const userId = localStorage.getItem('userId');
  
    const isSubmitting = navigation.state === 'submitting';

    // Get current date and default date
    const currDate = new Date();
    currDate.setDate(currDate.getDate());
    const defaultDate = currDate.toISOString().substring(0,10);
  
    // Cancel button handler
    function cancelHandler() {
      navigate('..');
    }

    const emotions = [
        { id: "rad", label: "rad", image: img1 },
        { id: "happy", label: "happy", image: img2 },
        { id: "neutral", label: "neutral", image: img3 },
        { id: "sad", label: "sad", image: img4 },
        { id: "awful", label: "awful", image: img5 },

    ];
    
    const [selectedEmotion, setSelectedEmotion] = useState("neutral");
    
    const handleEmotionChange = (e, emotionId) => {
        e.preventDefault();
        setSelectedEmotion(emotionId);
    };
    
    const handleFormSubmit = async (e, method) => {
        // Prepare log entry data
        const logEntry = {      
            date: e.target.date.value, 
            notes: e.target.description.value, 
            selectedEmotion: selectedEmotion, 
            userId: userId,
        };
        // Call action function to save log
        const actionResult = await action({ method, logEntry });

        if (actionResult.success) {
            navigate('/logs');
            } else {
            
            }
        };
      
        return (
            <Form method={method} className={classes.form} onSubmit={(e)=>handleFormSubmit(e,method)}>
                {data && data.errors && (
                    <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                    </ul>
                )}
                <p>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    defaultValue={log ? log.date : defaultDate}
                />
                </p>
                <div>
                    <label htmlFor="title">Today I'm feeling</label>
                    <p className={classes.labelFeeling}>Pick an image for your current mood. <em>Neutral</em> is pre-selected.</p>
                    <div className={classes.buttonContainer}>
                        {emotions.map(emotion => (
                            <button
                                id="emotion"
                                key={emotion.id}
                                className={classes.emotionImage}
                                onClick={(e) => handleEmotionChange(e, emotion.id)}
                            >
                            <img src={emotion.image} alt={emotion.label} />
                            </button>
                        ))}
                    </div>
                    {selectedEmotion && (
                        <p>Mostly {selectedEmotion}</p>
                    )}
                </div>
                <p>
                <label htmlFor="description">Notes</label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    required
                    defaultValue={log ? log.description : ''}
                />
                </p>
                <div className={classes.actions}>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save'}
                </button>
                </div>
                <p className={classes.invite}> Share your emotion notes with us! Our AI will analyze and label them in the <em>analysis</em> section of each input.
                Later, enjoy easy-to-follow summaries of these labeled emotions over time</p>
            </Form>
        );
    }
  
export default LogForm;

// Function to perform action (save log)
export async function action({method, logEntry}) {
    try {
        let url = 'http://localhost:8080/logs';
  
        // if (method === 'PATCH') {
        //   const eventId = params.eventId;
        //   url = 'http://localhost:8080/logs' + eventId;
        // }
      
        const token = getAuthToken();
        const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(logEntry),
        });
    
        if (response.status === 422) {
          return { success: false, response };
        }
    
        if (!response.ok) {
          throw json({ message: 'Could not save log.' }, { status: 500 });
        }
    
        return { success: true, response };
      } catch (error) {
        return { success: false, error };
      }
    
}