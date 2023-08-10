import React from "react";
import { Link } from "react-router-dom"
import Header from "../components/commonUse/Header"
import Footer from '../components/commonUse/Footer';
// import AISearchBar from "../components/AI/AISearchBar";
import styles from "./SingingAI.module.css";


const SearchResult = () =>{
    return(
      <>
        <Header/>
        <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>뒤로가기</Link></button>
        {/* <AISearchBar/> */}
        <h3 className={styles.pageTitle}>AI가 불러주는 노래</h3>
        <Footer/>
      </>
  )
}
export default SearchResult