import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./HistoryDetailCom.module.css";
import Api from '../../Api/Api';

const HistoryDetail = () => {
  const { title } = useParams(); // title 값 추출
  const [hisDetailResults, sethisDetailResults] = useState([]);
  const [audio1, setAudio1] = useState(null);
  const [audio2, setAudio2] = useState(null);

  const getHistoryDetail = async () => {
    try {
      const response = await Api.get("/api/v1/result/history");

      const matchingItems = response.data.data.results.filter((item) => item.title === title);
      console.log(matchingItems)
      sethisDetailResults(matchingItems);

    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const formattedDate = dateString.slice(5, 16)
    .replace('-', '/')
    .replace('T', ' ');
    return formattedDate;
  };

  const playAudio = (url1, url2) => {
    const audio1 = new Audio(url1);
    const audio2 = new Audio(url2);
    setAudio1(audio1);
    setAudio2(audio2);

    audio1.play();
    console.log(audio1);
    audio2.play();
    console.log(audio2);
  };

  const pauseAudio = () => {
    if (audio1) {
      audio1.pause();
      setAudio1(null);
    }
    if (audio2) {
      audio2.pause();
      setAudio2(null);
    }
    // audio1.pause()
    // audio2.pause()
    // setAudio1(null);
    // setAudio2(null);
  };

  useEffect(() => {
    console.log(title);
    getHistoryDetail();
  }, []);

  return (
    <div>
      <h3>{`${title} 히스토리`}</h3>
      {hisDetailResults.map((item, index) => (
        <div key={index} className={styles.favsongData}>
          <p>{formatDate(item.createdDateTime)}</p>
          <button onClick={() => playAudio(item.mrFile, item.recordFile)}>듣기</button>
          <button onClick={pauseAudio}>정지</button>
          <hr/>
        </div>
      ))}

    </div>
  );
};

export default HistoryDetail;
