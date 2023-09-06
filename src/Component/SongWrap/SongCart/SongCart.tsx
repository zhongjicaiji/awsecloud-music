import React, { useEffect, useState ,memo} from "react";
import { SongT, trackIdT,CurrentSong } from "../../../interface/responseInter";
import classes from "./SongCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initSongHandler,toggleHandler } from "../../../store/reducer/PlaySongSlice";
import { forward } from "../../../store/router/RouteStack";
import { useGetSongDataQuery } from "../../../store/Api/songApi";
import { switchSong ,initSong} from "../../../store/reducer/SongListSlice";

interface SongCartT  extends trackIdT {
  list:trackIdT[];
  index: number;

}

function SongCart({index,detail,list}:{index:number,detail:SongT,list:SongT[]}) {
  //获取歌词数据

  
 const currentSong=useSelector((state:any)=>state.playSongSlice)
  const toPlay = useNavigate();


  const local=useLocation()
  const dispatch=useDispatch()
  const initHandler=()=>{
   
      dispatch(initSongHandler({
        id:detail.id,
        playState:true,
        name:detail.name,
        dTime:detail.dt,
        picUrl:detail.al.picUrl,
        fee:detail.fee,
        artistName:detail.ar[0].name,
    }))
  
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
       state:"PUSH"
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
