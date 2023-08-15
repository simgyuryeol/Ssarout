import React from 'react';
import styles from "./MainPage.module.css";
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';
import SearchBar from '../components/search/SearchBar';
import Slider from '../components/mainpage/Slider';
import AIProgress from '../components/mainpage/AIProgress';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import { NotificationImportant } from '@mui/icons-material';


const MainPage = () => {
  const isLogin = !!localStorage.getItem("token")
  const text = <span className={styles.questMent}>돋보기를 눌러 전체곡을 조회해보세요</span>;

  return (
    <div className={styles.div}>
      <Header />
      <div id='wrap-container'>
        <div className={styles.homecontainer}>
        <br/>
        <div className={styles.notice}>
          <p className={styles.searchMent}>연습하고 싶은 노래를 검색해보세요!</p>
          <div style={{marginTop: 0}}>
            <Tooltip placement="bottomRight" title={text}>
            <Badge dot style={{ marginLeft: '0.5rem', marginTop:'15px' }}>
              <NotificationOutlined style={{ marginLeft: '0.5rem', color:'white', fontSize: 20, marginBottom:0, marginTop:'15px' }} />
            </Badge>        
            </Tooltip>
          </div>
        </div>
        <br/>
        <SearchBar/>
        <br/><br/><br/>
        <Slider/><br/><br/><br/>
        {isLogin && (
        <AIProgress/>
        )}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
