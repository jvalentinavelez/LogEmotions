import React from 'react';
import PageContent from '../components/PageContent';

import img1 from '../assets/images/emotions/shuttle.png'

function HomePage() {
  return (
    <PageContent title="Welcome!">
      <p>Welcome to LogEmotions – Your Journey to Self-Discovery Begins Here 
               </p>
      <p>Start Logging Your Emotions. </p>
      <div><img src={img1} style={{width: '40px', height: '40px'}} alt={"shuttle image"} /></div>
    </PageContent>
  );
}

export default HomePage;