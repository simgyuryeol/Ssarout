import {React,useState} from 'react';
import { useLocation,  Link } from "react-router-dom";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const location = useLocation()
  const data = location.state?.data

  const [keyword, setKeyword] = useState(data || "")

  const updatePage = () => {
    // window.location.reload();
    window.location.replace("/search");
  }

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
          onClick={updatePage}
        />
        </Link>
      </div>
  );
};

export default SearchBar;
