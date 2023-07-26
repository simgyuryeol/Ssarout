import React from 'react';
import styles from "../../pages/MainPage.module.css";
import { Link } from 'react-router-dom'

const Header = ({ onLine2Click }) => {
  return (
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
    </div>
  );
};

export default Header;
