import styles from './NewSlider.module.css'
import React from 'react';
import { Carousel } from 'antd';
import NewSlider1 from './NewSlider1.png';
import NewSlider2 from './NewSlider2.png';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'transparent',
};

const NewSlider = () => (
  <Carousel effect="scrollx" autoplay dots={true}>
    <div>
      <img className={styles.NewSlider1} alt="NewSlider1" src={NewSlider1}/>
    </div>
    <div>
      <img className={styles.NewSlider1} alt="NewSlider2" src={NewSlider2}/>
    </div>
  </Carousel>
);

export default NewSlider;