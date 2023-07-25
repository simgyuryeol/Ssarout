import './App.css';
import MainPage from "./pages/MainPage"
import MyPage from "./pages/MyPage"
import SearchResult from "./pages/SearchResult"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/mypage" element={<MyPage/>}/>
        <Route exact path="/search" element={<SearchResult/>}/>

      </Routes>
    </div>
  );
}

export default App;
