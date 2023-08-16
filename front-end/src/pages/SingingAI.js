import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Api from '../Api/Api';
import Header from "../components/commonUse/Header"
import Footer from '../components/commonUse/Footer';
import styles from "./SingingAI.module.css";
import play from '../components/history/play.png'

const AISongs = () =>{
  const [AIResults, setAIResults] = useState([]);

  const removeDuplicates = (arr, prop) => { // 같은 노래 파일 여러 개인 경우 중복 제거
    return arr.filter((obj, index, self) =>
      index === self.findIndex(item => item[prop] === obj[prop])
    );
  };

  const getAISongs = async () => {
    try {
      const response = await Api.get("/api/v1/ai/covers");
      console.log(response.data)
      console.log(response.data.data.results)
      setAIResults(response.data.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAISongs();
  }, []);

  return(
    <>
      <div class="container">
      <Header/>
      <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>뒤로가기</Link></button>
      <h3 className={styles.pageTitle}>AI가 불러주는 노래</h3>

      <div className={styles.aiContainer}>
      {removeDuplicates(AIResults, 'title').map((item, index) => (
          <div key={index} className={styles.aiData}>
            <img className={styles.aiAlbumcover} alt="" src={item.albumCoverImage} />
            <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
            <img className={styles.playBtn} alt="play" src={play}/>
          </div>
        ))}
      </div>
      </div>
      <Footer/>
    </>
  )
}
export default AISongs