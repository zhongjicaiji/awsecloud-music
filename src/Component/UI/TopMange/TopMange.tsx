import React from 'react'
import classes from './TopMange.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  faArrowLeft,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

interface propsT{
  positioning:string,

}

function TopMange(props:propsT) {


  const back=useNavigate()

  console.log(props.positioning)

  const backHandler=()=>{
    back(props.positioning,{replace:true})
  }

  return (
    <div  className={classes.top}>
          <div className={classes.topLeft}>
            <FontAwesomeIcon onClick={backHandler} className={`${classes.icon}`} icon={faArrowLeft} />
            <span className={classes.title}>歌单</span>
          </div>
          <div  className={classes.topRight}>
            <FontAwesomeIcon className={`${classes.icon} ${classes.search}`} icon={faMagnifyingGlass} />
            <FontAwesomeIcon className={`${classes.icon}`} icon={faEllipsisVertical} />
          </div>
        </div>
  )
}

export default TopMange