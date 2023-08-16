import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styles from "./RecordedSongs.module.css";
import Api from '../../Api/Api';

const RecordedSongs = () => {
  const [recordResults, setrecordResults] = useState([]);

  const getRecord = async () => {
    try {
      const response = await Api.get("/api/v1/result/recorded-songs");
      // console.log(response.data)
      // console.log(response.data.data.resultCount)
      // console.log(response.data.data.results);
      if (response.data && response.data.data.results && response.data.data.results.length > 0) {
        setrecordResults(response.data.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <div>
      {recordResults.length > 0 ? (
        <p className={styles.recordMent}>기록된 노래</p>
      ) : (
        <p className={styles.recordMent}>기록된 노래가 없습니다.</p>
      )}
      {recordResults.map((item, index) => (
        <div key={index} className={styles.favsongData}>
          <img className={styles.favAlbumcover} alt="" src={item.albumCoverImage} />
          <div className={styles.dataNAvg}>
            <p className={styles.recordTitle}>{item.title} - {item.singer}</p>
            <div className={styles.avgNBtn}>
              <p className={styles.recordAvg}>{item.averageAccuracy}%</p>
              <button className={styles.growthBtn}>
                <Link to={{
                  pathname: `/growth/${item.songId}`,
                  state: {
                    songId: item.songId
                  },
                }} className={styles.growthBack}>+ 성장그래프 보기</Link></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordedSongs;