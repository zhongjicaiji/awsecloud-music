import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleRight, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";
import classes from "./Title.module.css";

function Title(props:any) {
  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <h1 className={classes.title}>{props.title}</h1>
        <FontAwesomeIcon className={classes.angleRight} icon={faAngleRight} />
      </div>
     {props.type==='parentsWrap'&&<FontAwesomeIcon className={classes.setting} icon={faEllipsisVertical} />} 
     {props.type==='childrenWrap'&&<span className={classes.desc}>{props.desc}</span>}
    </div>
  );
}

export default Title;
