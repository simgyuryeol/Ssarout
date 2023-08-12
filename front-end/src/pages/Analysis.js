import React from "react";
import LyricsBars from "../components/AnalysisPage/LyricsBars";
import { Link } from "react-router-dom";
import styles from "./Analysis.module.css"

const Analysis = () =>{
  let resultData = localStorage.getItem('data')
  resultData = JSON.parse(resultData)
  console.log(resultData)
  return(
    <div>
      <LyricsBars />
      <p className={styles.pitchMent}>{resultData.PitchScore}%의 음정 정확도를 갖고 계시네요!</p>
      <p className={styles.beatMent}>{resultData.beatScore}%의 박자 정확도를 보였습니다.</p>
      <p className={styles.praticeMent}>구간을 선택해 틀린 부분을 연습해보세요</p>
      {/* <br/> */}
      <button className={styles.toMainPageBtn}>
      <Link className={styles.toMainMent} to="/">메인페이지로 가기</Link>
      </button>
      <br/>
    </div>
  )
}

export default Analysis