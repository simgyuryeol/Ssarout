import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styles from "./MakeAI.module.css";
import Api from '../../Api/Api';
import { Progress } from 'antd';
import { Button, Space } from 'antd';

const MakeAI = () => {
  const [recordCounts, setrecordCounts] = useState([]);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [showAISongPageButton, setshowAISongPageButton] = useState(false);

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

  // api 보내서 만들어진 ai곡있는지 쳌하는 함수 있어야 함. 
  // 이걸 useEffect 안에 넣어야함.
  // 아니면 생성중이어도 새고할때마다 생성해주세요 버튼이 나옴
  const checkAIsongsExist = async () => {
    try {
      const response = await Api.get("/api/v1/ai/covers");
      console.log(response.data)
      console.log(response.data.data.results)
      if (response.data.data.results.aiCoverFile) {
        setshowAISongPageButton(true)
        // 생성중입니다 버튼을 ai 노래 들으러가기 링크로 바꿔주는 함수
      }
    } catch (error) {
      console.error(error);
    }
  };

  const requestAIsongs = async () => { // ai 노래 만들어주세요! 버튼 누르면
    try {
      await Api.post("/api/v1/ai/covers"
      ).then((response) => {
        console.log(response)
        setShowGenerateButton(false);
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getRecordCounts();
    checkAIsongsExist();
  }, []);

  return (
    <div>

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
          <p className={styles.AIRequestMent}>AI 노래 생성은 한 시간 정도 소요됩니다.</p>
          {showGenerateButton ? (
            <Button className={styles.AIRequest} onClick={requestAIsongs} type="primary" danger>
              AI 노래 만들어주세요!
            </Button>
          ) : (
            showAISongPageButton ? (
              <Link to="/singingAI" className={styles.singingAI}>
              AI가 불러주는 노래 들으러 가기
              </Link>
            ) : (
              <Button className={styles.AIRequest} onClick={checkAIsongsExist} type="primary">AI 노래를 생성중입니다</Button>
            )
          )}
        </>
      )}
    </div>
  );
};

export default MakeAI;