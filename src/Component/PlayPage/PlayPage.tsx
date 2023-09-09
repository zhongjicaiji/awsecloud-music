import React, {memo, useState, useEffect, useRef } from "react";
import classes from "./PlayPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCommentDots,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  RouteStackT,
  SongList,
  LyricListT
} from "../../interface/responseInter";
import { back as RouteBack } from "../../store/router/RouteStack";
import { useGetLyricQuery } from "../../store/Api/LyricApi";
import { initLyric } from "../../store/reducer/LyricSlice";



function PlayPage() {
  const LyricStyle:LyricListT=useSelector((state:any)=>state.LyricSlice)
  const wrapRef = useRef<HTMLDivElement>(null);
  const currentSong: SongList = useSelector(
    (state: any) => state.SongListSlice
  );
  const [showLyric, setShowLyric] = useState(false);

  const routeStack: RouteStackT = useSelector((state: any) => state.RouteStack);
  const imgRef = useRef<HTMLImageElement>(null);

  const newData = currentSong.lists[currentSong.currentIndex];
  const { data: lyricData, isSuccess } = useGetLyricQuery(newData.id);

  const back = useNavigate();
  const dispatch = useDispatch();
  const backHandler = () => {
    const backPath = routeStack.routeStack.at(-2);

    dispatch(RouteBack());
    //@ts-ignore
    back(backPath, {
      replace: true,
      state:{
        method:"POP"
      },
    });
  };
  useEffect(()=>{
   if(lyricData) dispatch(initLyric(lyricData))
  },[newData.id,lyricData])


  const showLyricHandler = () => {
    setShowLyric(!showLyric);
  };

  return (
    <div ref={wrapRef} className={classes.wrap}>
      <div className={classes.header}>
        <FontAwesomeIcon
          onClick={backHandler}
          className={`${classes.icon}`}
          icon={faArrowLeft}
        />
        <div className={classes.songName}>{newData.name}</div>
        <FontAwesomeIcon icon={faShareNodes} />
      </div>
      <div
        onClick={showLyricHandler}
        className={`${classes.center}  ${showLyric && classes.Lyric}`}
      >
        {showLyric ? (
          <div className={classes.lyricWrap} style={LyricStyle.currentStyle}>
            {isSuccess
              ? lyricData.map((item,index) => (
                  <p style={LyricStyle.currentIndex==index?{color:`#fff`}:{}} key={item.time} className={classes.lyricItem}>{item.lyc}</p>
                ))
              : "歌词加载中....."}
          </div>
        ) : (
          <div className={classes.dishDrop}>
            <div className={classes.dish}>
              <div className={classes.imgWrap}>
                <img
                  ref={imgRef}
                  className={classes.img}
                  src={newData.al.picUrl}
                  alt="专辑封面"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={classes.Context}>
        <div className={classes.songContext}>
          <div className={classes.info}>
            <div className={classes.minSongName}>{newData.name}</div>
            <div className={classes.artist}>
              <span className={classes.artistName}>{newData.ar[0].name}</span>
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

export default memo(PlayPage)  ;
