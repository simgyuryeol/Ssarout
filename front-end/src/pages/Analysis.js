import React from "react";
import LyricsBars from "../components/AnalysisPage/LyricsBars";
import { Link } from "react-router-dom";
const Analysis = () =>{
  let resultData = localStorage.getItem('data')
  resultData = JSON.parse(resultData)
  console.log(resultData)
  return(
    <div>
      <LyricsBars />
      <p>음정 점수는 {resultData.PitchScore}</p>
      <p>박자 점수는 {resultData.beatScore}</p>
      <button>
      <Link to="/">메인페이지로 가기</Link>
      </button>

    </div>
  )
}

export default Analysis