import React from "react";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";
import Api from '../../Api/Api';


const SearchResult = () => {
  const location = useLocation() //검색어 데이터는 {data}에 담겨있다.
  const data = location.state?.data

  const handleSearch = (keyword) => {
    // 검색 버튼을 눌렀을 때 백엔드로 API 요청
    try{
      Api.get("/api/v1/song", {text : keyword} ).then((response) => {
          console.log(response.data);
      })
    } 
    catch(error){
        console.error('Error:', error);
    }
  };
  
  return (
    <div>
      <br/>
      <SearchBar onSearch={handleSearch} />
      <br/>
      <p style={{ fontSize: '0.9rem' }}>(음악 넣기전 확인용)검색어: {data}</p>
      <p style={{ fontSize: '0.8rem' }}>검색 결과입니다.</p>
    </div>
  );
  
};

export default SearchResult;
