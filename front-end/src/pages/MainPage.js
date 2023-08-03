import React from 'react';
import styles from "./MainPage.module.css";
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';
import SearchBar from '../components/search/SearchBar';
import Slider from '../components/mainpage/Slider';


const MainPage = () => {
  return (
    <div className={styles.div}>
      <Header />
      <div id='wrapper'>
        <br/>
        <p className={styles.searchMent}>연습하고 싶은 노래를 검색해보세요!</p>
        <br/>
        <SearchBar/>
        <br/><br/><br/>
        <Slider/>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
