import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import styles from "./Hamburger.module.css";
import MenuIcon from '@mui/icons-material/Menu';

const BurgerMenuIcon = () => {
  return <MenuIcon className={styles.burgerIcon} />;
};

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, // 사이드바의 열림/닫힘 상태 저장
    };
  }

  handleBurgerIconClick = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <BurgerMenuIcon onClick={this.handleBurgerIconClick} />
        <Menu
          right
          width={'90%'}
          isOpen={isOpen}
          onStateChange={(state) => this.setState({ isOpen: state.isOpen })}
          styles={{
            bmMenuWrap: {
              background: isOpen ? '#fff' : 'transparent', 
            },
          }}
        >
          <p className={styles.menuitem}>
            로그인
          </p>
          <p className={styles.menuitem}>
            회원가입
          </p>
          <p className={styles.mypagemenu}><Link to="/mypage">
            마이페이지</Link>
          </p>
        </Menu>
      </div>
    );
  }
}

export default MenuBar;
