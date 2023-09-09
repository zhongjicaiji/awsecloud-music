import React, { useEffect, useState } from "react";
import "./App.css";

import RouterMap from "./Router/Router";
import AudioPlayer from "./Component/newPlayControl/AudioPlayer";
import { useDispatch } from "react-redux";
import { toggleHandler } from "./store/reducer/PlaySongSlice";
import BottomBar from "./Component/UI/BottomBar/BottomBar";
import { useLocation } from "react-router-dom";
import BottomComponent from "./Component/BottomComponent/BottomComponent";


function App() {

  const dispatch=useDispatch()
  const local=useLocation()

  useEffect(()=>{
   
    window.onbeforeunload=()=>{
      dispatch(toggleHandler(false))
    }
    return ()=>{
      window.onbeforeunload=null
    }

  },[local.pathname])

  return (
    <div className="app">
      <RouterMap />
    <BottomComponent/>
    </div>
  );
}

export default App;
