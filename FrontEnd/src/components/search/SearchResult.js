import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import Api from '../../Api/Api';
import styles from "./SearchResult.module.css";
import none from "./none.png"
import fullstar from "./fullstar.png"
import emptystar from "./emptystar.png"

const SearchResult = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [searchResults, setSearchResults] = useState([]);
  const isLogin = !!localStorage.getItem("token")

  const handleSearch = async (keyword) => {
    try {
      const response = await Api.get("/api/v1/song/search", {
        params: { text: keyword },
      });    
      if (response.data && response.data.data && response.data.data.length > 0) {
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleFav = async (songId) => {
    try {
      await Api.post("/api/v1/fav", {
        contentId: songId,
      }).then((response) => {
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

  const sortByStartTiming = (a, b) => {
    if (a.startTiming && !b.startTiming) {
      return -1;
    }
    if (!a.startTiming && b.startTiming) {
      return 1;
    }
    return 0; 
  };

  useEffect(() => {
    handleSearch(data);
  }, []);

  return (
    <div className={styles.container}>
      <br />
      <SearchBar onSearch={handleSearch}/>
      <br />
      {searchResults.length > 0 ? (
        <>
        <p style={{ fontSize: '0.9rem' }}>검색 결과입니다.</p>
        {searchResults
          .sort(sortByStartTiming)
          .map((item, index) => (
            <div key={index} className={`${styles.songdata} ${!item.startTiming ? styles.withStartTiming : ''}`}>
              <img className={styles.albumcover} alt="" src={item.albumCoverImage} />
              <div className={styles.dataNBtn}>
                <p className={styles.titleNsinger}>{item.title} - {item.singer}</p>
                {item.startTiming ? (
                  <Link to={{
                    pathname: `/record/${item.songId}`,
                    state: {
                      songId: item.songId,
                    },
                  }}><button className={styles.FullBtn}>부르러가기</button></Link>
                ) : (
                    <p className={`${styles.notAvailable} ${styles.withoutStartTiming}`}>추후 제공될 예정입니다</p>

                )}
              </div>
              {isLogin ? (
                <img
                  className={styles.favImage}
                  alt={item.isFav ? "즐겨찾기" : "즐겨찾기 안함"}
                  src={item.startTiming ? (item.isFav ? fullstar : emptystar) : none}
                  onClick={() => item.startTiming && toggleFav(item.songId)}
                />
              ) : (
                <img className={styles.noneImage} alt="none" src={none} />
              )}
            </div>
          ))}
        </>
      ) : (
        <p style={{ fontSize: '0.9rem' }}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResult;