import React, { Component } from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import styles from './Slider.module.css'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      // adaptiveHeight: true,
      arrows: true
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
            <img className={styles.sliderImg} alt="" src="./slider1.png"/>
            <p className={styles.sliderment}>AI로 분석한 리포트를 통해</p>
            <p className={styles.sliderment}>보컬 능력을 향상 시킬 수 있습니다.</p>
          </div>
          <div>
            <img className={styles.sliderImg} alt="" src="./slider2.png"/>
            <p className={styles.sliderment}>사용자의 목소리를 학습시켜</p>
            <p className={styles.sliderment}>AI가 완성한 내 노래를 들을 수 있습니다.</p>
          </div>
        </Slider>
      </div>
    );
  }
}