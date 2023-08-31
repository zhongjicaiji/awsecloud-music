import React from 'react';
import './App.css';
import { Route,  Routes } from 'react-router-dom';
import HomePage from './Component/Home/HomePage';
import SongDetails from './Component/SongDetails/SongDetails';


function App() {


  return (
  <>

    <Routes>
     <Route  path={"/"} element={<HomePage/>}>
  
     </Route>
     <Route path={'/songDetails/:id'} element={<SongDetails/>} > </Route>
    </Routes>

  
  </>
  );
}

export default App;
