import React from "react";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";


const SearchResult = () => {
  const location = useLocation() //검색어 데이터는 {data}에 담겨있다.
  const data = location.state.data
  
  return (
    <div>
      <br/>
      <SearchBar />
      <br/>
      <p style={{ fontSize: '0.9rem' }}>(음악 넣기전 확인용)검색어: {data}</p>
      <p style={{ fontSize: '0.8rem' }}>검색 결과입니다.</p>
    </div>
  );
  
};

export default SearchResult;
