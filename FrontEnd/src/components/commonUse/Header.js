import React from 'react';
import styles from "./Header.module.css";
import { Link } from 'react-router-dom'
import Hamburger from '../commonUse/Hamburger'

const Header = () => {
  return (
    <div className={styles.header}>
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link to="/"><div className={styles.logo}>싸:라웃</div></Link>
      </div>
      <div className={styles.hamburgerContainer}>
        <Hamburger />
      </div>
    </div></div>
  );
};

export default Header;
