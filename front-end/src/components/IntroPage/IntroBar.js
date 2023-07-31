import React, { Component } from "react";
import Slider from "react-slick";
import "./slick2.css";
import "./slick-theme2.css";
import styles from './IntroBar.module.css';

export default class ImageBar extends Component {
    render() {
      const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
      };
      return (
        <div>
          <Slider {...settings}>
            <div>
              <img className={styles.introBarImg} alt="퍼펙트 스코어" src="./intro1.png"/>
              <p className={styles.introBig}>AI 트레이너가 전해주는 실시간</p>
              <p className={styles.introBig}>피드백을 받을 수 있어요</p>
              <p className={styles.introSmall}>음정, 박자 등 노래를 부르는 중</p>
              <p className={styles.introSmall}>어느 부분이 틀렸는지 확인할 수 있어요</p>
            </div>
            <div>
              <img className={styles.introBarImg} alt="결과 그래프" src="./intro2.png"/>
              <p className={styles.introBig}>부른 노래에 대한</p>
              <p className={styles.introBig}>리포트를 받을 수 있어요</p>
              <p className={styles.introSmall}>음정, 박자, 감정 등</p>
              <p className={styles.introSmall}>전체적인 종합점수를 확인할 수 있어요</p>
              
            </div>
            <div>
              <img className={styles.introBarImg} alt="성장 그래프" src="./intro3.png"/>
              <p className={styles.introBig}>각 곡별 성장 기록을</p>
              <p className={styles.introBig}>확인할 수 있어요</p>
              <p className={styles.introSmall}>곡별 종합 점수의 성장 추이를</p>
              <p className={styles.introSmall}>한 눈에 파악할 수 있어요</p>
            </div>
            <div>
              <img className={styles.introBarImg} alt="마이크 사진" src="./intro4.png"/>
              <p className={styles.introBig}>AI가 내 목소리로</p>
              <p className={styles.introBig}>노래를 불러줘요</p>
              <p className={styles.introSmall}>곡별 종합 점수의 성장 추이를</p>
              <p className={styles.introSmall}>한 눈에 파악할 수 있어요</p>
            </div>
          </Slider>
        </div>
      );
    }
  }