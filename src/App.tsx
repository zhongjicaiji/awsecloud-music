import React from 'react';
import './App.css';
import { Route,  Routes } from 'react-router-dom';
import HomePage from './Component/Home/HomePage';
import SongDetails from './Component/SongDetails/SongDetails';
import PlayPage from './Component/PlayPage/PlayPage';


function App() {


  return (
  <>

    <Routes>
     <Route  path={"/"} element={<HomePage/>}></Route>
     <Route path={'/songDetails/:id'} element={<SongDetails/>} > </Route>
     <Route path={'/playPage/:id'} element={<PlayPage/>}></Route>
     
    </Routes>

  
  </>
  );
}

export default App;
