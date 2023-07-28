import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const IntroPage = ({ setShowIntro }) => {
  const handleHideIntro = () => {
    setShowIntro(false);
  };

  return (
    <div>
      {/* 서비스 소개 페이지 컨텐츠 */}
      <p>서비스를 소개하는 내용입니다.</p>
      <button onClick={handleHideIntro}>다시 보지 않기</button>
    </div>
  );
};

const MainPage = () => {
  return (
    <div>
      <p>메인 페이지 내용입니다.</p>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <Switch>
        <Route path="/intro">
          {showIntro ? <IntroPage setShowIntro={setShowIntro} /> : <Redirect to="/" />}
        </Route>
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default App;
