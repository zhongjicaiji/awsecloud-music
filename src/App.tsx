import React from 'react';


import './App.css';
import SongList from './Component/SongList/SongList';
import { Route,  Routes } from 'react-router-dom';
import HomePage from './Component/Home/HomePage';

function App() {
  return (
  <>
    <Routes>
     <Route path={"/"} element={<HomePage/>}>

     </Route>
    </Routes>
  </>
  );
}

export default App;
