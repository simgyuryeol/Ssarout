import React from 'react';
import Header from "../components/commonUse/Header";
import Footer from "../components/commonUse/Footer";
import HistoryCom from "../components/history/HistoryCom"

const History = () => {
  return (
    <div>
      <Header/>
      <h2>히스토리</h2>
      <HistoryCom/>
      <Footer/>
    </div>
  );
};

export default History;
