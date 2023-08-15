import React, { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import SingTest from "../../test";
import Header from "../commonUse/Header";
import Api from "../../Api/Api";

const lyricsTime =[{"startnode":0,"endnode":20,"starttime":0,"endtime":9000},
{"startnode":21,"endnode":36,"starttime":9000,"endtime":13800},
{"startnode":37,"endnode":49,"starttime":13800,"endtime":19200},
{"startnode":50,"endnode":71,"starttime":19200,"endtime":28200},
{"startnode":72,"endnode":87,"starttime":28200,"endtime":33000},
{"startnode":88,"endnode":99,"starttime":33000,"endtime":37200},
{"startnode":100,"endnode":114,"starttime":37200,"endtime":41400},
{"startnode":115,"endnode":132,"starttime":41400,"endtime":46800},
{"startnode":133,"endnode":147,"starttime":46800,"endtime":51000},
{"startnode":148,"endnode":163,"starttime":51000,"endtime":57600},
{"startnode":164,"endnode":184,"starttime":57600,"endtime":66600},
{"startnode":185,"endnode":200,"starttime":66600,"endtime":71400},
{"startnode":201,"endnode":212,"starttime":71400,"endtime":75600},
{"startnode":213,"endnode":227,"starttime":75600,"endtime":79800},
{"startnode":228,"endnode":245,"starttime":79800,"endtime":85200},
{"startnode":246,"endnode":260,"starttime":85200,"endtime":89400},
{"startnode":261,"endnode":276,"starttime":89400,"endtime":94200},
{"startnode":277,"endnode":294,"starttime":94200,"endtime":99000},
{"startnode":295,"endnode":302,"starttime":99000,"endtime":101400},
{"startnode":303,"endnode":317,"starttime":101400,"endtime":106200},
{"startnode":318,"endnode":327,"starttime":106200,"endtime":108900},
{"startnode":328,"endnode":346,"starttime":108900,"endtime":114150},
{"startnode":347,"endnode":361,"starttime":114150,"endtime":119100},
{"startnode":362,"endnode":379,"starttime":119100,"endtime":123900},
{"startnode":380,"endnode":417,"starttime":123900,"endtime":132900},
{"startnode":418,"endnode":432,"starttime":132900,"endtime":137550},
{"startnode":433,"endnode":450,"starttime":137550,"endtime":142350},
{"startnode":451,"endnode":465,"starttime":142350,"endtime":147150},
{"startnode":466,"endnode":481,"starttime":147150,"endtime":151500},
{"startnode":482,"endnode":488,"starttime":151500,"endtime":154200},

]


const LyricsBar = ({ val, startTime, endTime, endnode, onClick,activeBar }) => {
  const timeInterval = endTime - startTime;
  const barStyle = {
    width: `${(timeInterval / lyricsTime[endnode].endtime) * 100}%`,
    height: "10px",
    borderRadius: "30px",
    opacity: 0.7,
    border: "solid 0.5px",
    backgroundColor: (activeBar===endTime) ? "#000000" : (val ? "#008EDE" : "#FF317B"),
    cursor: "pointer",
  };


  return (
    <button className="lyrics-bar" style={barStyle} onClick={() => onClick(endnode, endTime)}></button>
  );
};

const LyricsBars = () => {
  const [rerecordlyrics, setRerecordLyrics] = useState({});
  const setRecord = (rerecordlyrics) =>{
    setRerecordLyrics(rerecordlyrics)
  }
  const [activeBar, setActiveBar] = useState(null);
  const onClick = (endnode, endTime) => {
    let rerecord = endnode;
    for (let i = 0; i < endnode + 1; i++) {
      if (lyricsTime[i].endtime === endTime) {
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
      lyricsTime[rerecord].startnode,
      lyricsTime[rerecord].endnode + 1
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
    console.log(ly,'여기만 하면 가사는 끝!')
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

  let data = localStorage.getItem("data");
  data = JSON.parse(data);

  let idx = data.scores.findIndex((score) => score === -1);
  if (idx === -1) {
    idx = data.scores.length - 1;
  } else {
    idx = idx - 1;
  }
  let nodeidx = lyricsTime.findIndex(
    (time) => time.startnode <= idx && time.endnode >= idx
  );
  const resultArray = [];
  for (let i = 0; i <= nodeidx; i++) {
    let bad = 0;
    for (let j = lyricsTime[i].startnode; j <= lyricsTime[i].endnode; j++) {
      if (data.scores[j] === "bad") {
        bad += 1;
      }
    }
    resultArray.push({
      val: bad < (lyricsTime[i].endnode - lyricsTime[i].startnode + 1) / 2,
      startTime: lyricsTime[i].starttime,
      endTime: lyricsTime[i].endtime,
      endnode: nodeidx,
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
                  endnode={timeInfo.endnode}
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