import React from 'react';
import styles from "../../pages/MainPage.module.css";


const Footer = () => {
  return (
    <div className={styles.footer}>
      <hr className={styles.footerLine}></hr>
      <div className={styles.footerMent}>
        Copyright © 2023 • SSA:rout Inc.
      </div>
    </div>

  );
};

export default Footer;
