import React, { useEffect } from "react";
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
import { CurrentSong, RouteStackT, SongT ,SongList} from "../../interface/responseInter";
import { initSongHandler } from "../../store/reducer/PlaySongSlice";
import { back as RouteBack, showPlayControl} from "../../store/router/RouteStack";
import { useGetSongDataQuery } from "../../store/Api/songApi";
import { changeSong } from "../../store/reducer/SongListSlice";



function PlayPage() {
  const currentSong: SongList = useSelector(
    (state: any) => state.SongListSlice
  );
  const routeStack: RouteStackT = useSelector((state: any) => state.RouteStack);
  // const {data,isSuccess,refetch}=useGetSongDataQuery(currentSong.id)
  const newData=currentSong.lists[currentSong.currentIndex]
  const back = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {

      dispatch(
        initSongHandler({
          ...newData,
          playState:true,
          dTime:newData.dt,
          picUrl:newData.al.picUrl,
          artistName:newData.ar[0].name,
          currentTime:0
        })
      );
 
   
  }, [currentSong.currentSongId]);
  const backHandler = () => {
    const backPath = routeStack.routeStack.at(-2);

    dispatch(RouteBack());
    //@ts-ignore
    back(backPath, {
      replace: true, 
      state:"POP"
    });
  
  };
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
      <div className={classes.center}>
      <div className={classes.dishDrop}>
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

export default PlayPage;
