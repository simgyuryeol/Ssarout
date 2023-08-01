import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';

const UpdatePage = () => {
  return (
    <div>
      <Header/>
      <h1>회원 정보 수정</h1>
      <button><Link to="/mypage">뒤로가기</Link></button>

      <p><Link to="/delete">회원탈퇴</Link></p>
      <Footer/>
    </div>
  );
};

export default UpdatePage;
