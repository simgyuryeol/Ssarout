import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';
import Api from "../Api/Api";
import styles from "./Growth.module.css";
import { ResponsiveLine } from '@nivo/line'


const Growth = () => {
  const data = useParams(); // songId, title, singer
  const [growthGraph, setGrowthGraph] = useState([]);

  const getGrowthGraph = async () => {
    try {
      const response = await Api.get(`/api/v1/result/recorded-songs/${data.songId}`);
      setGrowthGraph(response.data.data.results);
      console.log(response.data.data.results)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGrowthGraph();
  }, [data]);

  const formatDate = (dateString) => { // createdDateTime mm/dd 형식으로 변경
    const formattedDate = dateString.slice(5, 10);
    return formattedDate.replace('-', '/');
  };

  const test = [
    {
      "id": data.title,
      "data": growthGraph.map(item => ({
        "x": item.createdDateTime,
        "y": item.accuracy,
      })),
    },
  ]
  
  const MyResponsiveLine = () => (
    <div style={{ width: '400px', height: '300px', margin: '0 auto' }}>
    <ResponsiveLine
        data={test}
        margin={{ top: 30, right: 70, bottom: 30, left: 30 }}
        theme={{
          textColor: "#FFFFFF",
          fontSize: 14,
          fontFamily: 'lineRg',
          axis: { // 바닥 날짜
            ticks: {
                text: {
                    fontSize: 11,
                    fill: '#c7c7c7',
                },
            },
          },
          grid: {
            line: {
              strokeDasharray: "5 5", // 배경 가로세로 줄 dash
              opacity: 0.5,
            }
          }
        }}
        xScale={{ type: 'point' }} // 동그라미 위 숫자
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{ // 바닥에 날짜부분
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            format: (values) => formatDate(values), // 이게 데이터 format화
            // 안하면 같은 날짜 녹음은 한개로 그룹핑됨
        }}
        axisLeft={null}
        enableGridX={true} // 배경 세로 줄
        colors="#ffb860" // 데이터들 잇는 선 색
        pointSize={13}
        pointColor="#ffb860" // 동그라미
        pointBorderWidth={2}
        pointBorderColor="#ffb860" // 동그라미 테두리
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-16}
        enableArea={false} // 동그라미 아래 영역 색 채우기
        useMesh={false}
        legends={[]}
        isInteractive={false} // 값 눌렀을때 작게 뜨는거
        enableSlices="x"
    /></div>
  )

  return (
    <div className="growthContainer">
      {/* <Header/> */}
      <br/><br/><br/>
      <p className={styles.recordTitle}>{data.title} - {data.singer}</p>
      <MyResponsiveLine/>
      <br/><br/>
      <button className={styles.updateBackBtn}><Link to="/mypage" className={styles.updateBackA}>확인</Link></button>
      {/* <Footer/> */}
    </div>
  );
};

export default Growth;
