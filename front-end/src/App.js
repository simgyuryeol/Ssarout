import './App.css';
import {Routes, Route} from "react-router-dom"
import MainPage from "./pages/MainPage"
import MyPage from "./pages/MyPage"
import UserUpdate from './pages/UserUpdate';
import SearchResult from "./pages/SearchResult"
import SingingAI from "./pages/SingingAI"
import SingingAIResult from "./pages/SingingAIResult"
import Login from './pages/Login';
import Redirecion from './pages/Redirection';
import ServiceIntro from './pages/ServiceIntro';
import NickNamePage from "./pages/NickNamePage";
import History from "./pages/History";
import PublicRoute from './lib/PublicRoute';
import PrivateRoute from './lib/PrivateRoute';
import SingTest from '../src/test'
import Analysis from './pages/Analysis';
import Growth from './pages/Growth';
import HistoryDetail from './pages/HistoryDetail'

// Private : 다시부르기 나중에 추가하기

function App() {
  return (
    <div className="App">
      <Routes>

        <Route exact path="/" element={<MainPage/>}/>
        <Route 
          exact path="/mypage" 
          element={
            <PrivateRoute>
              <MyPage />  
            </PrivateRoute>
          }
        />

        <Route exact path="/search" element={<SearchResult/>}/>

        <Route 
          exact path="/update" 
          element={
            <PrivateRoute>
              <UserUpdate />  
            </PrivateRoute>
          }
        />
       
        <Route 
          exact path="/singingAI" 
          element={
            <PrivateRoute>
              <SingingAI />  
            </PrivateRoute>
          }
        />

        <Route 
          exact path="/singingAIresult" 
          element={
            <PrivateRoute>
              <SingingAIResult />  
            </PrivateRoute>
          }
        />

        <Route 
          exact path="/login" 
          element={
            <PublicRoute>
              <Login />  
            </PublicRoute>
          }
        />

        <Route exact path="/oauth/redirect" element={<Redirecion/>}/>
        <Route exact path="/intro" element={<ServiceIntro/>}/>
        <Route exact path="/record/:songId" element={<SingTest />} />

        <Route 
          exact path="/analysis" 
          element={
            <PrivateRoute>
              <Analysis />  
            </PrivateRoute>
          }
        />

        <Route 
          exact path="/nickNamePage" 
          element={
            <PrivateRoute>
              <NickNamePage />  
            </PrivateRoute>
          }
        />
      
        <Route 
          exact path="/history" 
          element={
            <PrivateRoute>
              <History />  
            </PrivateRoute>
          }
        />
        
        <Route 
          exact path="/history/:title"
          element={
            <PrivateRoute>
              <HistoryDetail />  
            </PrivateRoute>
          }
        />

        <Route 
          exact path="/growth/:songId/:title/:singer" 
          element={
            <PrivateRoute>
              <Growth />  
            </PrivateRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
