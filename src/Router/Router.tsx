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

interface ANIMATION_MAP_T {
  [KEY: string]: string;
}

const ANIMATION_MAP: ANIMATION_MAP_T = {
  PUSH: "forward",
  POP: "back",
};

const RoutesConfig=[
    {
        id:uniqueId(),
        path:"/",
        element:<HomePage />,
      
    },
    {
        id:uniqueId(),
        path:"/songDetails/:id",
        element:<SheetDetails />,
      
    },
    {
        id:uniqueId(),
        path:"/playPage/:id",
        element:<PlayPage />,
      
    },
    {
      id:uniqueId(),
      path:"/RankingPage/:id",
      element:<RankingPage />,
    }
 
]

function RouterMap() {
  const local = useLocation();

 
  let classNames:string
  if(local.state){
    if(local.state.method === 'PUSH') {
      classNames = 'forward' ;
    } else if(local.state.method === 'POP') {
      classNames = 'back' ;
    }
  }else classNames=''

  return (
    <TransitionGroup 
    childFactory={child=>React.cloneElement(child,{classNames})}
    >
      <CSSTransition
        timeout={500}
     
        key={local.pathname}
      >
        <Routes>
          {RoutesConfig.map(item=><Route key={item.id} path={item.path} element={item.element}></Route>)}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default RouterMap;
