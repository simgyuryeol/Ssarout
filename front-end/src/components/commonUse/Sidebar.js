import React from 'react';
import styled from 'styled-components';
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'


const SideBarWrap = styled.div`
  z-index: 5;
  background-color: #fff;
  height: 100%;
  width: 60%;
  right: -55%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;

  display: flex;
  flex-direction: column;

  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideBarWrap className={isOpen ? 'open' : ''}>
      <img
        className={styles.closeIcon}
        src="./close.png"
        alt="close"
        onClick={toggleSide}
        onKeyDown={toggleSide}
      />
      <ul className={styles.ul}>
        <p className={styles.menuitem}>
          로그인
        </p>
        <p className={styles.menuitem}>
          회원가입
        </p>
        <p className={styles.mypagemenu}><Link to="/mypage">
          마이페이지</Link>
        </p>
      </ul>
    </SideBarWrap>
  );
};

export default Sidebar;
