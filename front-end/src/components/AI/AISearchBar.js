import {React,useState} from 'react';
import { Link } from 'react-router-dom';


const SearchBar = () => {
  const [keyword, setKeyword] = useState("")
  const onChange =(event) => {
    setKeyword(event.target.value)
  }
  return (
    <div>
      <input value={keyword} onChange={onChange} type='text' />
      <button><Link to="/singingAIResult" state={{data: keyword}}>search</Link></button>
    </div>
  );
};

export default SearchBar;
