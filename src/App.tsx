import React from 'react';
import './App.css';
import { Route,  Routes } from 'react-router-dom';
import HomePage from './Component/Home/HomePage';
import SheetDetails from './Component/SheetDetails/SheetDetails';
import PlayPage from './Component/PlayPage/PlayPage';
import PlayControl from './Component/PlayPage/playControl/PlayControl';
import { RouteStackT } from './interface/responseInter';
import { useSelector } from 'react-redux';


function App() {
  const showPlayControl:RouteStackT=useSelector((state:any)=>state.RouteStack)

  return (
  <>

    <Routes>
     <Route  path={"/"} element={<HomePage/>}></Route>
     <Route path={'/songDetails/:id'} element={<SheetDetails/>} > </Route>
     <Route path={'/playPage/:id'} element={<PlayPage/>}></Route>
     
    </Routes>
    
    {
      !showPlayControl.showPlayControl&& <div hidden >
      
      <PlayControl  type='exit' />
      </div>
   
    }
 

  
  </>
  );
}

export default App;
