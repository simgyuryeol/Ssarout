import React from 'react';
import styles from "../../pages/MainPage.module.css";
import { Link } from 'react-router-dom'
import Hamburger from '../commonUse/Hamburger'

const Header = ({ onLine2Click }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link to="/"><div className={styles.div1}>싸:라웃</div></Link>
      </div>
      <div className={styles.hamburgerContainer}>
        <Hamburger />
      </div>
    </div>
  );
};

export default Header;
