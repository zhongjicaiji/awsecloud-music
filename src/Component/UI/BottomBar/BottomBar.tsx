
import {
  faHouse,
  faMusic,
  faMicrophoneLines,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./BottomBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";


function BottomBar() {


  




  return (
    <div className={classes.BottomBar}>
       <NavLink  to={'home'} state={{method:'REPLACE'}}  replace>
       <div className={classes.iconWrap}>
       
       <FontAwesomeIcon className={classes.icon} icon={faHouse} />
       </div>
        </NavLink>
        <NavLink to={'songHall'} state={{method:'REPLACE'}} replace>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faMusic} />
      </div>
      </NavLink>
      <NavLink to={'artistPage'} state={{method:'REPLACE'}} replace>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faMicrophoneLines} />
      </div>
      </NavLink>
      <NavLink to={'chatPage'} state={{method:'REPLACE'}} replace>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faComments} />
      </div>
      </NavLink>
      <NavLink to={'userPage'} state={{method:'REPLACE'}} replace>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faUser} />
      </div>
      </NavLink>
    </div>
  );
}

export default BottomBar;
