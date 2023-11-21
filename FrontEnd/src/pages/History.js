import React from 'react';
import Header from "../components/commonUse/Header";
import Footer from "../components/commonUse/Footer";
import HistoryCom from "../components/history/HistoryCom"
import styles from "./History.module.css"

const History = () => {
  return (
    <div>
      <div className={styles.container}>
      <Header/>
      <HistoryCom/></div>
      <Footer/>
    </div>
  );
};

export default History;
