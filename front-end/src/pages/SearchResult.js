import React from "react";
import { useLocation } from "react-router-dom";

const SearchResult = () =>{
    const location = useLocation()
    const data = location.state.data
    return(<div>
        {data}
        </div>)
}
export default SearchResult