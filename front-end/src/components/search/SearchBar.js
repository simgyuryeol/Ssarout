import {React,useState} from 'react';
import { useLocation,  Link, useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const location = useLocation()
  const data = location.state?.data
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState(data || "")

  const updatePage = () => {
    window.location.replace("/search");
  }

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  const enterPress = (event) => {
    if(event.key === "Enter"){
      event.preventDefault();
      navigate('/search', { state: { data: keyword } });
      window.location.replace("/search");
    }
  };

  return (
    <div className={styles.searchBox}>
      <input 
        className={styles.searchbar} 
        placeholder="노래명, 가수명을 입력하세요" 
        value={keyword}
        onKeyUp={enterPress}
        onChange={onChange}
        type='text' />
        <Link to="/search" state={{data: keyword}}> 
        <img
          className={styles.searchIcon}
          alt="search"
          src="./search.png"
          onClick={updatePage}
        />
        </Link>
      </div>
  );
};

export default SearchBar;
