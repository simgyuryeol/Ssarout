import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styles from "./MakeAI.module.css";
import Api from '../../Api/Api';
import { Progress } from 'antd';
import { Button, Space } from 'antd';

const MakeAI = () => {
  const [recordCounts, setrecordCounts] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  const getRecordCounts = async () => {
    try {
      const response = await Api.get("/api/v1/result/recorded-songs");
      console.log(response.data.data.resultCount)
      setrecordCounts(response.data.data.resultCount)
    } catch (error) {
      console.error(error);
    }
  };

  const changePercent = (counts) => {
    return (counts/10)*100
  }

  const requestAIsongs = async () => { // ai 노래 만들어주세요! 버튼 누르면
    try {
      await Api.post("/api/v1/ai/covers"
      ).then((response) => {
        console.log(response)
        setShowGenerateButton(true); // true로 설정하여 버튼을 토글
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getRecordCounts();
  }, []);


  return (
    <div>
      {/* <Link to="/singingAI" className={styles.singingAI}>
        AI가 불러주는 노래 들으러 가기
      </Link> */}
      <p className={styles.AItitle}>AI가 불러주는 노래</p>
      {recordCounts < 10 ? (
        <>
          <Progress size={[300, 15]} percent={changePercent(recordCounts)} showInfo={false} status="active" trailColor='white' strokeColor={{ from: '#108ee9', to: '#87d068' }} />
          <p className={styles.recordMent1}>{recordCounts} / 10</p>
          <p className={styles.recordMent}>아직 녹음 데이터가 부족해요!</p>
        </>
      ) : (
        <>
          <p className={styles.AIRequestMent}>데이터가 충분히 모였습니다.</p>
          <p className={styles.AIRequestMent}>AI 노래 생성은 한시간 정도 소요됩니다.</p>
          <Button className={styles.AIRequest} onClick={requestAIsongs} type="primary" danger>
            AI 노래 만들어주세요!
          </Button>
        </>
      )}
    </div>
  );
};

export default MakeAI;