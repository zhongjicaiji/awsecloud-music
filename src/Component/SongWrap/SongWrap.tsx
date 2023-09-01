import React from 'react'
import classes from './SongWrap.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faCirclePlay, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { playSongsT } from '../../interface/responseInter'
import SongCart from './SongCart/SongCart'


function SongWrap(props:playSongsT) {
 
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <div className={classes.playHandler}>
        <FontAwesomeIcon className={classes.icon} icon={faCirclePlay} style={{color: "#d62448",}} />
      <h2 className={classes.headerTitle}>播放全部</h2>
      <span className={classes.songCount}>({props.count})</span>
        </div>
        <div className={classes.songSet}>
        <FontAwesomeIcon className={classes.icon}  icon={faArrowDown} />
        <FontAwesomeIcon className={classes.icon} icon={faListCheck} />
        </div>
     


      </div>
      <div className={classes.body}>
      {props.trackIds?.map((item,index)=><SongCart key={item.id} index={index+1} {...item}  />)}
    
    
      </div>
   
    
    </div>
  )
}

export default SongWrap