import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './MyPage.module.css'

const MyPage = () => {
  const [nickname, setNickname] = useState("Guest")

  return (
    <div>
      <h1>My Page</h1>
      
      <h2>{ nickname }</h2>
      <Link to="/update" className={ styles.updateBtn }>회원 정보 수정</Link>
    </div>
  );
};

export default MyPage;
