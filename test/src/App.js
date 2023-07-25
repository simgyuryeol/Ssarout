import React from 'react';
import { BrowserRouter as Routes, Route
 } from 'react-router-dom';
 import SearchResult from './pages/SearchResult';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/SearchResult" element={<SearchResult />} />

      </Routes>

    </div>
  );
}

export default App;
