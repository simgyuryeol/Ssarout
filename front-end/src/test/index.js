import React from 'react';
import Test from './Test';
// import styles from './style.module.css';
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
    <div>
        <Header />
    <div class='box' id="Singtest">
        {/* <Header /> */}

      {/* <svg className={styles.pulse} viewBox="0 0 1024 1024">
        <circle className={styles.Oval1} cx="512" cy="512" r="512"></circle>
        <circle className={styles.Oval2} cx="512" cy="512" r="512"></circle>
		    <circle className={styles.Oval3} cx="512" cy="512" r="512"></circle>
      </svg> */}

        {/* <div class="wave"></div>
        <div class="wave -two"></div>
        <div class="wave -three"></div> */}
        {/* <div className={`${styles['-two']} ${styles['wave']}`}></div> */}
        {/* <div className={`${styles['-three']} ${styles['wave']}`}></div> */}
        <br />

    </div></div>
  );
};

export default SingTest;
