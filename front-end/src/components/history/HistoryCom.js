import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styles from "./HistoryCom.module.css";
import Api from '../../Api/Api';

const History = () => {
  const [historyResults, sethistoryResults] = useState([]);

  const getHistory = async () => {
    try {
      const response = await Api.get("/api/v1/result/history");
      console.log(response.data.data);
      if (response.data && response.data.data && response.data.data.length > 0) {
        sethistoryResults(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFav = async (songId) => {
    try {
      await Api.post("/api/v1/fav", {
        contentId: songId,
      }).then((response) => {
        console.log(response)
        // 누르면 새로고침되는거 다시.
        // setfavResults((prevResults) =>
        //   prevResults.map((item) =>
        //     item.songId === songId
        //       ? { ...item, isFav: !item.isFav }
        //       : item
        //   )
        // );
        window.location.reload();
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      {historyResults.length > 0 ? (
        <p className={styles.favMent}>즐겨찾기</p>
      ) : (
        <p className={styles.favMent}>즐겨찾기가 없습니다.</p>
      )}
      {historyResults.map((item, index) => (
        <div key={index} className={styles.favsongData}>
          <Link to={{
              pathname: `/record/${item.songId}`,
              state: {
                songId: item.songId,
              }, 
            }}><img className={styles.favAlbumcover} alt="" src={item.albumCoverImage} /></Link>
          <img
            className={styles.favImage}
            alt={item.isFav ? "즐겨찾기" : "즐겨찾기 안함"}
            src={item.isFav ? "./emptystar.png" : "./fullstar.png"}
            onClick={() => toggleFav(item.songId)}
          />
        </div>
      ))}
    </div>
  );
};

export default History;
