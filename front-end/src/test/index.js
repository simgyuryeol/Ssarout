import React from 'react';
import Test from './Test';
import './style.css';
import Header from '../components/commonUse/Header';
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
    // class="box" - 파도
    <div class="box" id="Singtest">
        <Header />

        {/* <svg class="pulse" version="1.1" viewBox="0 0 800 800">
          <circle id="Oval1" cx='400' cy='400' r='400'/>
          <circle id="Oval2" cx='400' cy='400' r='400'/>
          <circle id="Oval3" cx='400' cy='400' r='400'/>
        </svg> */}

        <div class='wave -one'></div>
        <div class='wave -two'></div>
        <div class='wave -three'></div>
        <br />

    </div>
  );
};

export default SingTest;
