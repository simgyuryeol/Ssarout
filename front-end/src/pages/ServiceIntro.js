import React from 'react';
import { Link } from 'react-router-dom';
import IntroBar from '../components/IntroPage/IntroBar'
import styles from './ServiceIntro.module.css'


const ServiceIntro = () => {

  return (
    <div className={ styles.container }>
      <div className={ styles.introBarContainer }>
        <IntroBar />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Link to="/" className={ styles.skipBtn }>건너뛰기</Link>
    </div>
  );
};

export default ServiceIntro;
