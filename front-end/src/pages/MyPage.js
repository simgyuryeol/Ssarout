import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/commonUse/Header";
import Footer from "../components/commonUse/Footer";
import Favorite from "../components/mypage/Favorite";
import RecordedSongs from "../components/mypage/RecordedSongs";
import MakeAI from "../components/mypage/MakeAI";
import styles from "./MyPage.module.css";
import Api from "../Api/Api";

const MyPage = () => {
  const [nickname, setNickname] = useState("Guest");
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    f1();
  }, []);

  const f1 = async () => {
    try {
      const response = await Api.get("/api/v1/users");
      // console.log(response.data);
      setNickname(response.data.data.nickname);
      setProfileUrl(response.data.data.profileImageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <br/>
      <div className={styles.profile}>
        <img className={styles.profileImg} alt="profileImg" src={profileUrl} />
        <div className={styles.nicknameAndUpdate}>
          <h2 className={styles.nickname}>{nickname}</h2>
          <Link to="/update" className={styles.updateBtn}>회원 정보 수정</Link>
        </div>
      </div>
      <Favorite/>
      <RecordedSongs/><br/>
      <MakeAI/>
      {/* <br/><br/> */}
      {/* <Link to="/singingAI" className={styles.singingAI}>
        AI가 불러주는 노래 들으러 가기
      </Link> */}
      <br/><br/>
      {/* <Footer /> */}
    </div>
  );
};

export default MyPage;
