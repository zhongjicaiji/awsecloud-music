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

import { CurrentSong, RouteStackT } from "../../interface/responseInter";
import PlayControl from "../playControl/PlayControl";
import { initSongHandler } from "../../store/reducer/PlaySongSlice";
import { back as RouteBack, showPlayControl} from "../../store/router/RouteStack";
import { useGetSongDataQuery } from "../../store/Api/songApi";


function PlayPage() {
  const currentSong: CurrentSong = useSelector(
    (state: any) => state.playSongSlice
  );
  const routeStack: RouteStackT = useSelector((state: any) => state.RouteStack);
  const {data,isSuccess,refetch}=useGetSongDataQuery(currentSong.id)

  const back = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
  
    refetch().then(res=>{
    
  if(res.data!==undefined)
      dispatch(
        initSongHandler({
          ...currentSong,
          name:res.data.name,
          dTime:res.data.dt,
          picUrl:res.data.al.picUrl,
          fee:res.data.fee,
          artistName:res.data.ar![0].name,
          currentTime:0
        })
      );
    })
       
      dispatch(showPlayControl(true))
  }, [currentSong.id]);
  const backHandler = () => {
    const backPath = routeStack.routeStack.at(-2);

    dispatch(RouteBack());
    //@ts-ignore
    back(backPath, {
      replace: true, 
      state:"POP"
    });
    dispatch(showPlayControl(false))
  };
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <FontAwesomeIcon
          onClick={backHandler}
          className={`${classes.icon}`}
          icon={faArrowLeft}
        />
        <div className={classes.songName}>{data?.name}</div>
        <FontAwesomeIcon icon={faShareNodes} />
      </div>
      <div className={classes.center}>
      <div className={classes.dishDrop}>
        <div className={classes.dish}>
          <div className={classes.imgWrap}>
            <img
              className={classes.img}
              src={data?.al.picUrl}
              alt="专辑封面"
            />
          </div>
        </div>
      </div>
      </div>
      <div className={classes.Context}>
        <div className={classes.songContext}>
          <div className={classes.info}>
            <div className={classes.minSongName}>{data?.name}</div>
            <div className={classes.artist}>
              <span className={classes.artistName}>
                {data?.ar[0].name}
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

     
        <PlayControl />
      </div>
    </div>
  );
}

export default PlayPage;
