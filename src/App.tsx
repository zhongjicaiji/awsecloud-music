import React from "react";
import "./App.css";
import PlayControl from "./Component/playControl/PlayControl";
import { RouteStackT } from "./interface/responseInter";
import { useSelector } from "react-redux";
import RouterMap from "./Router/Router";

function App() {
  const showPlayControl: RouteStackT = useSelector(
    (state: any) => state.RouteStack
  );

  return (
    <>
      <RouterMap />
      {!showPlayControl.showPlayControl && (
        <div hidden>
          <PlayControl type="exit" />
        </div>
      )}
    </>
  );
}

export default App;
