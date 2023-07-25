import React from 'react';
import styles from "../../pages/MainPage.module.css";
import { Link } from 'react-router-dom'

const Header = ({ onLine2Click }) => {
  return (
    <>
      <Link to="/"><div className={styles.div1}>싸:라웃</div></Link>
      <div className={styles.lineDiv} onClick={onLine2Click} />
    </>
  );
};

export default Header;
