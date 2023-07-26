import React from 'react';
import styles from "../../pages/MainPage.module.css";
import { Link } from 'react-router-dom'
import Hamburger from '../commonUse/Hamburger'

const Header = ({ onLine2Click }) => {
  return (
<<<<<<< HEAD
    <div>
      <Link to="/"><div className={styles.div1}>싸:라웃</div></Link>
      {/* <div className="hamburger">
        <div className="side-menu" style={{width:width}}>
          <button onClick={()=>setWidth(0)}>X</button>
          <ul className="mobile-side">
            {menuList.map(menu=><li><a>{menu}</a></li>)}
          </ul>
        </div>
        <div className="menu-open" onClick={()=>setWidth(25)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='login-button' onClick={authenticate == false?goToLogin:(event)=>goToLogout(event)}>
          <FontAwesomeIcon className="login-icon" icon={faUser}/>
          {authenticate == true?"로그아웃":"로그인"}
        </div>
      </div> */}
=======
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <Link to="/"><div className={styles.div1}>싸:라웃</div></Link>
      </div>
      <div className={styles.hamburgerContainer}>
        <Hamburger />
      </div>
>>>>>>> 5bbac3e5e522e5af55d5499751f9eead5ecdd180
    </div>
  );
};

export default Header;
