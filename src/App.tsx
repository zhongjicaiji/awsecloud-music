import React from "react";
import "./App.css";

import RouterMap from "./Router/Router";
import AudioPlayer from "./Component/newPlayControl/AudioPlayer";

function App() {
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
