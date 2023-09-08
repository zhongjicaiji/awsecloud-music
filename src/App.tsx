import React, { useEffect } from "react";
import "./App.css";

import RouterMap from "./Router/Router";
import AudioPlayer from "./Component/newPlayControl/AudioPlayer";
import { useDispatch } from "react-redux";
import { toggleHandler } from "./store/reducer/PlaySongSlice";

function App() {
  const dispatch=useDispatch()

  useEffect(()=>{
    window.onbeforeunload=()=>{
      dispatch(toggleHandler(false))
    }
    return ()=>{
      window.onbeforeunload=null
    }

  },[])

  return (
    <div className="app">
      <RouterMap />
      <div className="AudioPlayerStyle">
      <AudioPlayer />
      </div>
    </div>
  );
}

export default App;
