import React from 'react';
import Test from './Test';
import './style.css';
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';
import { useParams } from 'react-router-dom';
import Api from '../Api/Api';

const SingTest = (rerecordlyrics,mrFile) => {
  const songId = useParams(); // songId에 담겨있음!
  console.log(songId,"shdfasdklfjad")
  console.log(rerecordlyrics)
  React.useEffect(() => {
    const appContainer = document.querySelector('#Singtest');
    const test = new Test(appContainer,songId,rerecordlyrics.rerecordlyrics,mrFile);
    console.log(window.location)
    console.log(songId)
    
  }, [songId]);

  return (
    <div id="Singtest">
      <Header />
      <br />
      {/* Your component's JSX content here */}
      <Footer />
    </div>
  );
};

export default SingTest;
