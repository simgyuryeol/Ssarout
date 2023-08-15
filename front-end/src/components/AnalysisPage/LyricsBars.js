import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import SingTest from "../../test";
import Header from "../commonUse/Header";
import Api from "../../Api/Api";

let data = localStorage.getItem("data");
data = JSON.parse(data);
const lyricsTime = data.lyricsTime


const LyricsBar = ({ val, startTime, endTime, endNode, onClick,activeBar }) => {
  const timeInterval = endTime - startTime;
  const barStyle = {
    width: `${(timeInterval / lyricsTime[endNode].endTime) * 100}%`,
    height: "10px",
    borderRadius: "30px",
    opacity: 0.7,
    border: "solid 0.5px",
    backgroundColor: (activeBar===endTime) ? "#000000" : (val ? "#008EDE" : "#FF317B"),
    cursor: "pointer",
  };


  return (
    <button className="lyrics-bar" style={barStyle} onClick={() => onClick(endNode, endTime)}></button>
  );
};

const LyricsBars = () => {

  const [rerecordlyrics, setRerecordLyrics] = useState({});
  const setRecord = (rerecordlyrics) =>{
    setRerecordLyrics(rerecordlyrics)
  }
  const [activeBar, setActiveBar] = useState(null);
  const onClick = (endNode, endTime) => {
    let rerecord = endNode;
    for (let i = 0; i < endNode + 1; i++) {
      if (lyricsTime[i].endTime === endTime) {
        rerecord = i;
        break;
      }
      // console.log(activeBar,"여기는 activeBar")
    }
    if (endTime === activeBar) {
      setActiveBar(null);
    } else {
      setActiveBar(endTime);
    }

    let data = localStorage.getItem("data");
    data = JSON.parse(data);
    let rerecordlyrics = data.notes.slice(
      lyricsTime[rerecord].startNode,
      lyricsTime[rerecord].endNode + 1
    );
    const mrFile = data.mrUrl
    let lenrerecordlyrics = rerecordlyrics.length
    const startTime = rerecordlyrics[0].start
    for(let i = 0;i < lenrerecordlyrics; i++){
      rerecordlyrics[i].start -= startTime
    }
    const ly = Object()
    ly.rerecordlyrics = rerecordlyrics
    ly.startTime = startTime
    localStorage.setItem('ly',JSON.stringify(ly))
    setRecord(rerecordlyrics)
    setTimeout(() =>{
      let LineLyrics = document.querySelector("#lineLyrics")
      let LineLyricsTxt = ""
      rerecordlyrics.forEach(element => {
        if(element.lylic){
          LineLyricsTxt += element.lylic
        } else{
          LineLyricsTxt += " "
        }
      });
      if(LineLyrics){
      LineLyrics.textContent = LineLyricsTxt}
    })
  };



  let idx = data.scores.findIndex((score) => score === -1);
  if (idx === -1) {
    idx = data.scores.length - 1;
  } else {
    idx = idx - 1;
  }
  let nodeidx = lyricsTime.findIndex(
    (time) => time.startNode <= idx && time.endNode >= idx
  );
  const resultArray = [];
  for (let i = 0; i <= nodeidx; i++) {
    let bad = 0;
    for (let j = lyricsTime[i].startNode; j <= lyricsTime[i].endNode; j++) {
      if (data.scores[j] === "bad") {
        bad += 1;
      }
    }
    resultArray.push({
      val: bad < (lyricsTime[i].endNode - lyricsTime[i].startNode + 1) / 2,
      startTime: lyricsTime[i].startTime,
      endTime: lyricsTime[i].endTime,
      endNode: nodeidx,
    });
  }
  
  // API 요청이 잘 안되는 이유가 뭔지 모르곘어
  let songData =JSON.parse(localStorage.getItem('data'))
  let songTitle = songData.songTitle
  let singer = songData.singer




  const flexContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px"
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };


  return (
    <div>
      <Header />
          <div className="bar-container">
            <br/>
            <h3>{songTitle} -  {singer}</h3>
            <div style={flexContainerStyle}>
              {resultArray.map((timeInfo, index) => (
                <LyricsBar
                  key={index}
                  startTime={timeInfo.startTime}
                  endTime={timeInfo.endTime}
                  endNode={timeInfo.endNode}
                  val={timeInfo.val}
                  onClick={onClick}
                  activeBar={activeBar}
                />
              ))}
            </div>
          </div>
          {(Object.keys(rerecordlyrics).length > 0 && activeBar !== null) ? (
      <SingTest rerecordlyrics={rerecordlyrics} mrFile={0}/>
    ) : null}


        </div>

  );
};

export default LyricsBars;