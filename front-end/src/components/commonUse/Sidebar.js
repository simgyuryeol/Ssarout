import React from 'react';
import styled from 'styled-components';
import styles from './Sidebar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../Api/Api";
import close from './close.png'


const SideBarWrap = styled.div`
  z-index: 5;
  background-color: #fff;
  height: 100%;
  width: 72%;
  right: -72%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;

  display: flex;
  flex-direction: column;
  align-items: center;

  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  const isLogin = !!localStorage.getItem("token")

  const logout = async () => {
    try {
      await Api.post("/logout").then((response) => {
        localStorage.removeItem("token");
        // console.log(response);
        // toggleSide(); 
        // window.location.replace("/");
        // navigate("/")
      }).then((response) => {
        window.location.reload();
      })
    } catch (error) {
      localStorage.removeItem("token");
      console.error(error);
    }
  };

  const gotoMain = () => {
    navigate('/');
  }

  return (
    <SideBarWrap className={isOpen ? 'open' : ''}>
      <img
        className={styles.closeIcon}
        src={close}
        alt="close"
        onClick={toggleSide}
        onKeyDown={toggleSide}
      />
      
      <div className={styles.ul}>
        {isLogin ? (
          <div className={styles.ul}>
          <p className={styles.menuitem} onClick={() => {
                  logout();
                  toggleSide();
                  gotoMain();
                  }}>로그아웃</p>     
          
          <p className={styles.menuitem}><Link className={styles.menuitem} to="/mypage">마이페이지</Link></p>
          <p className={styles.menuitem}><Link className={styles.menuitem} to="/history">히스토리</Link></p></div>
        ) : (
          <p className={styles.menuitem}><Link className={styles.menuitem} to="/login">로그인</Link></p>
        )}
      </div>
    </SideBarWrap>
  );
};

export default Sidebar;
