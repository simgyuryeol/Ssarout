import React from 'react';
import Header from "../components/commonUse/Header";
import Footer from "../components/commonUse/Footer";
import HistoryDetailCom from "../components/history/HistoryDetailCom"

const History = () => {
  return (
    <div>
      <Header/>
      <HistoryDetailCom/>
      <Footer/>
    </div>
  );
};

export default History;
