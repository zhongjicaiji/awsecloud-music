import React from 'react'
import classes from './TopMange.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  faArrowLeft,
  faEllipsisVertical,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from 'react-redux';
import { RouteStackT } from '../../../interface/responseInter';
import { back  as RouteBack } from '../../../store/router/RouteStack';



function TopMange() {
  const dispatch=useDispatch()
  const routeStack:RouteStackT=useSelector((state:any)=>state.RouteStack)
  
  const back=useNavigate()
console.log(routeStack)


  const backHandler=()=>{

    const backPath=routeStack.routeStack.at(-2)
 
    dispatch(RouteBack())
    //@ts-ignore
    back(backPath,{replace:true})
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