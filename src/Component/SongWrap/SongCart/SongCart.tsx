import React, { memo} from "react";
import { SongT, } from "../../../interface/responseInter";
import classes from "./SongCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { forward } from "../../../store/router/RouteStack";

import { initSong} from "../../../store/reducer/SongListSlice";
import useInitSong from "../../Hooks/initData";

function SongCart({index,detail,list}:{index:number,detail:SongT,list:SongT[]}) {
  //获取歌词数据
  const toPlay = useNavigate();
  const initNewSong=useInitSong()

  const dispatch=useDispatch()
  const initHandler=()=>{
    initNewSong(detail)
  dispatch(initSong({
      id:detail.id,
      index:index-1,
      lists:list
  }))
 }
   
  
 
  const clickHandler=()=>{
    toPlayHandler()
    initHandler()
   
  }
  const toPlayHandler=()=>{
   
    dispatch(forward(`/playPage/${detail.id}`))
    toPlay(`/playPage/${detail.id}`,{
       replace:false,
       state:{
        method:"PUSH"
       }
    })
  }
  return (

    <div onClick={clickHandler} className={classes.wrap}>
    <div className={classes.info}>
      <span className={classes.index}>{index}</span>
      <div className={classes.songMes}>
        <h3 className={classes.songName}>{detail.name}</h3>
        <div className={classes.descWrap}>
          {detail.fee === 1&& (
            <span className={classes.vip}>VIP</span>
          )}
          {detail.fee === 4&& (
            <span className={classes.vip}>付费</span>
          )}
          <span className={classes.quality}>高品质</span>
          <span className={classes.desc}>
            {detail.ar![0].name} - {detail.name}
          </span>
        </div>
      </div>
    </div>
    <FontAwesomeIcon className={classes.setting} icon={faEllipsisVertical} />
  </div>
  );
}

export default memo(SongCart) ;
