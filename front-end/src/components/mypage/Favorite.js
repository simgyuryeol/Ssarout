import {React, useState, useEffect} from 'react';
// import { useLocation,  Link } from "react-router-dom";
import styles from "./Favorite.module.css";
import Api from '../../Api/Api';

const Favorite = () => {
  const [favIds, setFavIds] = useState(""); // 즐겨찾기 한 songId들
  const [favResults, setfavResults] = useState([]); // songId를 가지고 받아온 info

  const getFav = async () => {
    try {
      const response = await Api.get("/api/v1/fav");
      console.log(response.data);
      setFavIds(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 즐겨찾기한 songId들을 파람스에 담아 /api/v1/song/info로 get 요청 보냄
  // 맞겠지..?

  const getSongInfo = async (songId) => {
    try {
      const response = await Api.get("/api/v1/song/info", {
        params: { songId: songId },
      });    
      console.log(response.data.data);
      setfavResults((prevResults) =>
        prevResults.map((item) =>
          item.songId === songId ? { ...item, songInfo: response.data.data } : item
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFav = async (songId) => {
    try {
      await Api.post("/api/v1/fav", {
        contentId: songId,
      }).then((response) => {
        console.log(response)
        // 누르면 새로고침되는거 다시.
        setfavResults((prevResults) =>
          prevResults.map((item) =>
            item.songId === songId
              ? { ...item, isFav: !item.isFav }
              : item
          )
        );
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  useEffect(() => {
    favIds.forEach((favId) => {
      getSongInfo(favId);
    });
  }, [favIds]);

  return (
    <div>
      <p>즐겨찾기</p>
      {favResults.map((item, index) => (
        <div key={index} className={styles.songdata}>
          <img className={styles.albumcover} alt="" src={item.albumCoverImage} />
          <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
          <img
            className={styles.favImage}
            alt={item.isFav ? "즐겨찾기" : "즐겨찾기 안함"}
            src={item.isFav ? "./fullstar.png" : "./emptystar.png"}
            onClick={() => toggleFav(item.songId)}
          />

        </div>
      ))}
    </div>
  );
};

export default Favorite;
