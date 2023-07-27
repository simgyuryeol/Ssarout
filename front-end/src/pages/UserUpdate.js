import React from 'react'
import Profile from '../components/mypage/Profile'
import { Link } from 'react-router-dom'
import Header from '../components/commonUse/Header'

const UpdatePage = () => {
  return (
    <div>
      <Header/>
      <h1>회원 정보 수정</h1>
      <button><Link to="/mypage">뒤로가기</Link></button>
      <Profile />
      {/* 프로필 이미지, 닉네임 수정할 수 있도록 하기 */}

<<<<<<< HEAD
=======

>>>>>>> frontend
      <p><Link to="/delete">회원탈퇴</Link></p>
    </div>
  );
};

export default UpdatePage;
