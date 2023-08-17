import {React, useState, useEffect} from 'react';
import styles from "./AIProgress.module.css";
import Api from '../../Api/Api';
import { Progress, Tooltip } from 'antd';
import questmark from './questmark.png'

const MakeAI = () => {
  const [recordCounts, setrecordCounts] = useState([]);
  const text = <span className={styles.questMent}>AI 학습을 위해 최소 5곡의 녹음이 필요합니다.
  녹음을 마친 후, 마이페이지에서 AI 곡을 요청해주세요!</span>;

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
    return (counts/5)*100
  }

  useEffect(() => {
    getRecordCounts();
  }, []);

  return (
    <div>
      <p className={styles.AItitle}>AI 커버곡을 위한 데이터 수집중...</p>
      <Progress size={[300, 15]} percent={changePercent(recordCounts)} showInfo={false} status="active" trailColor='white' strokeColor={{ from: '#ffb860', to: '#87d068' }} />
      <div className={styles.mentNquest}>
        {recordCounts > 4 ? (
          <p className={styles.recordMent2}>수집 완료!</p>
        ) : (
          <p className={styles.recordMent1}>{recordCounts} / 5</p>
        )}
        <Tooltip size="300px" placement="top" title={text}>
        <img className={styles.questIcon} alt="quest" src={questmark}/>
        </Tooltip>
      </div>
    </div>
  );
};

export default MakeAI;