import {React,useState} from 'react';
import { Link } from 'react-router-dom';


const SearchBar = () => {
  // SearchBar 컴포넌트의 내용
  const [keyword, setKeyword] = useState("")
  const onChange =(event) => {
    setKeyword(event.target.value)
  }
  return (
    <div>
      <input value={keyword} onChange={onChange} type='text' />
      <button><Link to="/search" state={{data: keyword}}>search</Link></button>
    </div>
  );
};

export default SearchBar;
