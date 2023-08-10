import React from 'react';
import { Link } from 'react-router-dom'
import Header from "../components/commonUse/Header";
import Footer from "../components/commonUse/Footer";
import HistoryDetailCom from "../components/history/HistoryDetailCom"
import styles from "./HistoryDetail.module.css";

const History = () => {
  return (
    <div>
      <Header/>
      <button className={styles.updateBackBtn}><Link to="/history" className={styles.updateBackA}>뒤로가기</Link></button>
      <HistoryDetailCom/>
      <Footer/>
    </div>
  );
};

export default History;
