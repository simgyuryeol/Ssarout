import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import styles from "./HistoryCom.module.css";
import Api from '../../Api/Api';

const History = () => {
  const [historyResults, sethistoryResults] = useState([]);

  const getHistory = async () => {
    try {
      const response = await Api.get("/api/v1/result/history");
      if (response.data.data && response.data.data.results.length > 0) {
        sethistoryResults(response.data.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeDuplicates = (arr, prop) => { // 같은 노래 파일 여러 개인 경우 중복 제거
    return arr.filter((obj, index, self) =>
      index === self.findIndex(item => item[prop] === obj[prop])
    );
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      <h3 className={styles.pageTitle}>히스토리</h3>
      <div className={styles.historyContainer}>
      {historyResults.length > 0 ? (
        <>
          <p className={styles.historyMent}>앨범아트를 눌러 녹음한 곡들을 다시 들어보세요!</p>
          <div className={styles.favTotal}>
          {removeDuplicates(historyResults, 'title').map((item, index) => (
            <div key={index} className={styles.hisData}>
              <Link to={{
                pathname: `/history/${encodeURIComponent(item.title)}`,
                state: {
                  title: encodeURIComponent(item.title),
                },
              }}><img className={styles.hisAlbumcover} alt="" src={item.albumCoverImage} /></Link>
              <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
            </div>
          ))}
          </div>
        </>
      ) : (
        <p className={styles.nohisMent}>아직 부른 노래가 없네요!</p>
      )}
      </div>
    </div>
  );
};

export default History;
