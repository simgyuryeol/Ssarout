import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/commonUse/Header"

const AISearchResult = () =>{
    const location = useLocation()
    const data = location.state.data
    
    return(
      <>
        <Header/>
        <button><Link to="/mypage">뒤로가기</Link></button>
        <div>
          {data}
        </div>
        <p>검색 결과입니다.</p>
      </>
  )
}
export default AISearchResult