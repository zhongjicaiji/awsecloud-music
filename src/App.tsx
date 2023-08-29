import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import SongList from './Component/SongList/SongList';

function App() {
  return (
    <div className="App">
      <SongList></SongList>
    </div>
  );
}

export default App;
