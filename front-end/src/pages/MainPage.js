import React from 'react';
import styles from "./MainPage.module.css";
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';
import SearchBar from '../components/search/SearchBar';

const MainPage = () => {

  return (
    <div className={styles.div}>
      <Header />
      <div id='wrapper'>
        <SearchBar/>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
