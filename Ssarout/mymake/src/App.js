import React, { useState } from 'react';
import { ParseScore } from './ScoreParser';
import MakeCanvas from './MakeCanvas';
// import Dictaphone from './Dictaphone';

const App = () => {
  const sheet = "t60 o3 l4  d'동'g.'해'f+8'물'e'과' g'백'd'두'c-'산'd'이' g'마'a8'르'b8'고'b+.'닳'b8'도' a2'록'.r  >d.'하'c8'느'<b'님'a'이' g'보'f+8'우'e8d'하'c-'사' d'우'g'리'a8'나'a8'라'b'만' g2.'세'r  f+.'무'g8a'궁'f+'화' b.'삼'>c8d'천'<b'리' a'화'g'려'f+'강'g a2.'산'r  >d.'대'c8'한'<b'사'a'람' g'대'f+8'한'e8d'으'c-'로' d'길'g'이'a8'보'a8'전'b'하'g2.'세'r"
  const val = ParseScore(sheet)

return (
    <div>
      <h1>오선지 캔버스</h1>
      <MakeCanvas val={val}/>
      {/* <Dictaphone /> */}
    </div>
  );
};

export default App;
