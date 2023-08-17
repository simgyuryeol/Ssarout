import React from 'react';
import styles from "./MainPage.module.css";
import Header from '../components/commonUse/Header';
import Footer from '../components/commonUse/Footer';
import SearchBar from '../components/search/SearchBar';
import NewSliderSlider from '../components/mainpage/NewSlider';
import AIProgress from '../components/mainpage/AIProgress';
import { NotificationOutlined } from '@ant-design/icons';
import { Badge, Tooltip } from 'antd';
import { NotificationImportant } from '@mui/icons-material';


const MainPage = () => {
  const isLogin = !!localStorage.getItem("token")
  const text = <span className={styles.questMent}>돋보기를 눌러 전체곡을 조회해보세요</span>;

  return (
    <div className={styles.div}>
      <div className={styles.container}>
      <Header />
        <div className={styles.homecontainer}>
        <br/><br/><br/>
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
        <SearchBar/><br/><br/> 
        <NewSliderSlider/>
        </div>

        {isLogin && (
        <AIProgress/>
        )}<br/></div>
      
      <Footer />
    </div>
  );
};

export default MainPage;
