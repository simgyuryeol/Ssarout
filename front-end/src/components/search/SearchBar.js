import {React,useState} from 'react';
import { useLocation,  Link } from "react-router-dom";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const location = useLocation()
  const data = location.state?.data //Optional Chaining에게 무한감사.

  const [keyword, setKeyword] = useState(data || "")

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <div className={styles.searchBox}>
      <input 
        className={styles.searchbar} 
        placeholder="노래명, 가수명을 입력하세요" 
        value={keyword} 
        onChange={onChange} type='text' />
        <Link to="/search" state={{data: keyword}}> 
        <img
          className={styles.searchIcon}
          alt="search"
          src="./search.png"
        />
        </Link>
      </div>
  );
};

export default SearchBar;
