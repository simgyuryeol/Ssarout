import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import Api from '../../Api/Api';
import styles from "./SearchResult.module.css";

const SearchResult = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (keyword) => {
    try {
      const response = await Api.get("/api/v1/song/search", {
        params: { text: keyword },
      });    
      console.log(response.data.data);
      if (response.data && response.data.data && response.data.data.length > 0) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFav = async (songId) => {
    // console.log(songId)
    try {
      await Api.post("/api/v1/fav", {
        contentId: songId,
      }).then((response) => {
        console.log(response)
        // window.location.replace("/search");
        setSearchResults((prevResults) =>
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
    handleSearch(data);
  }, []);

  return (
    <div>
      <br />
      <SearchBar onSearch={handleSearch}/>
      <br />
      {/* <p style={{ fontSize: '0.9rem' }}>(음악 넣기전 확인용)검색어: {data}</p> */}
      {searchResults.length > 0 ? (
        <p style={{ fontSize: '0.9rem' }}>검색 결과입니다.</p>
      ) : (
        <p style={{ fontSize: '0.9rem' }}>검색 결과가 없습니다.</p>
      )}
      {searchResults.map((item, index) => (
        <div key={index} className={styles.songdata}>
          <img className={styles.albumcover} alt="" src={item.albumCoverImage} />
          <div className={styles.dataNBtn}>
            <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
            <Link to={{
              pathname: `/record/${item.songId}`,
              state: {
                songId: item.songId,
              },
            }}><button className={styles.FullBtn}>완곡</button></Link>
            <Link to={{
              pathname: `/record/${item.songId}`,
              state: {
                songId: item.songId,
              },
            }}><button className={styles.LineBtn}>소절</button></Link>
          </div>
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

export default SearchResult;

