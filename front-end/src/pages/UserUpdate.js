import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';
import Api from "../Api/Api";
import styles from "./UserUpdate.module.css";


const UpdatePage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const [nickname, setNickname] = useState("Guest");
  const [profileUrl, setProfileUrl] = useState("");
  let profileImg;
  
  useEffect(() => {
    f1();
  }, []);

  const f1 = async () => {
    try {
      const response = await Api.get("/api/v1/users");
      setNickname(response.data.data.nickname);
      setProfileUrl(response.data.data.profileImageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const nicknameChange = async () => {
    try {
      const nn = document.querySelector("#nickname").value;
      // console.log(nn);
      if (!nn) {
        alert("닉네임을 입력해주세요");
        return;
      }
      await Api.put("/api/v1/users", {
        nickname: nn,
        profileImg: profileImg,
      }).then((response) => {
        // console.log(response);
        window.location.replace("/mypage");
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const f3 = async () => {
    try {
      await Api.delete("/api/v1/users").then((response) => {
        console.log(response);
        localStorage.removeItem("token");
        window.location.replace("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
      <Header/>
      <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>뒤로가기</Link></button>
      <br/>
      <h3 className={styles.updateHeader}>회원 정보 수정</h3>
      <img className={styles.profileImg} alt="profileImg" src={profileUrl} />

      <p className={styles.updateMent}>닉네임 수정</p>
      <input placeholder={nickname} className={styles.changeNickname} id="nickname" type="text"></input>
      <br/><br/>
      <button className={styles.changeBtn} onClick={nicknameChange}>확인</button>
      <p className={styles.delete} onClick={f3}>회원탈퇴</p>
      </div>
      <Footer/>
    </div>
  );
};

export default UpdatePage;
