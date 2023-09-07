import React,{ memo, useState,useEffect } from "react";
import classes from "./PlayPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCommentDots,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  RouteStackT ,SongList,LyricArrT} from "../../interface/responseInter";
import { back as RouteBack} from "../../store/router/RouteStack";

import { useGetLyricQuery } from "../../store/Api/LyricApi";



function PlayPage() {
  const currentSong: SongList = useSelector(
    (state: any) => state.SongListSlice
  );
  const [showLyric,setShowLyric]=useState(false)
  
  const routeStack: RouteStackT = useSelector((state: any) => state.RouteStack);
  

  const newData=currentSong.lists[currentSong.currentIndex]
  const {data:lyricData,isSuccess,refetch}=useGetLyricQuery(newData.id)

  const back = useNavigate();
  const dispatch = useDispatch();
  const backHandler = () => {
    const backPath = routeStack.routeStack.at(-2);

    dispatch(RouteBack());
    //@ts-ignore
    back(backPath, {
      replace: true, 
      state:"POP"
    });
  
  };
 
  const showLyricHandler=()=>{
    setShowLyric(!showLyric)
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <FontAwesomeIcon
          onClick={backHandler}
          className={`${classes.icon}`}
          icon={faArrowLeft}
        />
        <div className={classes.songName}>{newData.name}</div>
        <FontAwesomeIcon icon={faShareNodes} />
      </div>
      <div onClick={showLyricHandler} className={`${classes.center}  ${showLyric&&classes.Lyric}`}>
        {showLyric?
          <div>
            {isSuccess?lyricData.lyricStr.map((item:string,index)=><p className={classes.lyricItem} >{item}</p>):'歌词加载中.....'}
          </div>  : <div className={classes.dishDrop}>
          <div className={classes.dish}>
            <div className={classes.imgWrap}>
              <img
                className={classes.img}
                src={newData.al.picUrl}
                alt="专辑封面"
              />
            </div>
          </div>
        </div>
      }
     
      </div>
      <div className={classes.Context}>
        <div className={classes.songContext}>
          <div className={classes.info}>
            <div className={classes.minSongName}>{newData.name}</div>
            <div className={classes.artist}>
              <span className={classes.artistName}>
                {newData.ar[0].name}
              </span>
              <span className={classes.interest}>关注</span>
            </div>
          </div>
          <div className={classes.like}>
            <span className={classes.count}>999+</span>
            <FontAwesomeIcon icon={faHeart} />
          </div>

          <div className={classes.comment}>
            <span className={classes.count}>999+</span>
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayPage ;
