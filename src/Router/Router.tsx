import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../Component/Home/HomePage";
import SheetDetails from "../Component/SheetDetails/SheetDetails";
import PlayPage from "../Component/PlayPage/PlayPage";
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";
import "./PageSwitchAnimation.css";
import { uniqueId } from "lodash";
import RankingPage from "../Component/RankingPage/RankingPage";
import Main from "../Component/Main/Main";
import ArtistPage from "../Component/ArtistPage/ArtistPage";
import UserPage from "../Component/UserPage/UserPage";
import SongHall from "../Component/SongHall/SongHall";

interface ANIMATION_MAP_T {
  [KEY: string]: string;
}

const ANIMATION_MAP: ANIMATION_MAP_T = {
  PUSH: "forward",
  POP: "back",
};

const RoutesConfig = [
  {
    id: uniqueId(),
    path: "/",
    element: <HomePage />,
  },
  {
    id: uniqueId(),
    path: "/songDetails/:id",
    element: <SheetDetails />,
  },
  {
    id: uniqueId(),
    path: "/playPage/:id",
    element: <PlayPage />,
  },
  {
    id: uniqueId(),
    path: "/RankingPage/:id",
    element: <RankingPage />,
  },
];

function RouterMap() {
  const local = useLocation();

  let classNames: string =
    (local.state && ANIMATION_MAP[local.state.method]) || "";
  console.log(local);

  return (
    <TransitionGroup
      childFactory={(child) => React.cloneElement(child, { classNames })}
    >
      <CSSTransition timeout={500} key={local.pathname}>
        <Routes>
          <Route path={"/"} element={<Main />}>
            <Route path={"home"} element={<HomePage />}></Route>
            <Route path={"songHall"} element={<SongHall />}></Route>
            <Route path={"artistPage"} element={<ArtistPage />}></Route>
            <Route path={"chatPage"} element={<HomePage />}></Route>
            <Route path={"userPage"} element={<UserPage />}></Route>
          </Route>
          <Route path={"/playPage/:id"} element={<PlayPage />}></Route>
          <Route path={"/songDetails/:id"} element={<SheetDetails />}></Route>
          <Route path={"/RankingPage/:id"} element={<RankingPage />}></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default RouterMap;
