import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import styles from "./Favorite.module.css";
import Api from '../../Api/Api';

const Favorite = () => {
  const [favResults, setfavResults] = useState([]);

  const getFav = async () => {
    try {
      const response = await Api.get("/api/v1/fav");
      // console.log(response.data.data);
      if (response.data && response.data.data && response.data.data.length > 0) {
        setfavResults(response.data.data);
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
        // console.log(response)
        window.location.reload();
      })
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getFav();
  }, []);

  return (
    <div>
      {favResults.length > 0 ? (
        <p className={styles.favMent}>즐겨찾기</p>
      ) : (
        <>
          <p className={styles.favMent}>즐겨찾기가 없습니다.</p>
          <br/>
        </>
     )}
      {favResults.map((item, index) => (
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

export default Favorite;
