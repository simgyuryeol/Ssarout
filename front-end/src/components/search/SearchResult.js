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
        // console.log(response)
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

  const sortByStartTiming = (a, b) => {
    if (a.startTiming && !b.startTiming) {
      return -1; // a가 startTiming이 있고 b가 없는 경우 a를 앞으로 정렬
    }
    if (!a.startTiming && b.startTiming) {
      return 1; // b가 startTiming이 있고 a가 없는 경우 b를 앞으로 정렬
    }
    return 0; // 두 경우가 모두 또는 모두 없는 경우 순서 변경 없음
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