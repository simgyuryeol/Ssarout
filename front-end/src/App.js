import './App.css';
import MainPage from "./pages/MainPage"
import MyPage from "./pages/MyPage"
import UserUpdate from './pages/UserUpdate';
import SearchResult from "./pages/SearchResult"
import SingingAI from "./pages/SingingAI"
import SingingAIResult from "./pages/SingingAIResult"
import Login from './pages/Login';
import Redirecion from './pages/Redirection';
import ServiceIntro from './pages/ServiceIntro';
import {Routes, Route} from "react-router-dom"
import NickNamePage from "./pages/NickNamePage";


function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<MainPage/>}/>
        <Route exact path="/mypage" element={<MyPage/>}/>
        <Route exact path="/search" element={<SearchResult/>}/>
        {/* UserUpdate 페이지 경로 update로 했음 */}
        <Route exact path="/update" element={<UserUpdate/>}/>
        <Route exact path="/singingAI" element={<SingingAI/>}/>
        <Route exact path="/singingAIResult" element={<SingingAIResult/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/oauth/redirect" element={<Redirecion/>}/>
        <Route exact path="/intro" element={<ServiceIntro/>}/>
        <Route exact path="/nickNamePage" element={<NickNamePage />} />

        
        

      </Routes>
    </div>
  );
}

export default App;
