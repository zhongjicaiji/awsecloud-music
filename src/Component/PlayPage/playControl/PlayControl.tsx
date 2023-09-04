import React, { useCallback, useEffect, useRef, useState, memo ,useLayoutEffect} from "react";
import classes from "./PlayControl.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import throttle from "../../Hooks/useThrottle";
import {
  faBackwardStep,
  faBarsStaggered,
  faForwardStep,
  faPause,
  faPlay,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  pauseHandler,
  playHandler,
  switchHandler,
  saveRange
} from "../../../store/reducer/PlaySongSlice";
import { CurrentSong, SongList } from "../../../interface/responseInter";
import useAxios from "../../Hooks/useAxios";
import { switchSong } from "../../../store/reducer/SongListSlice";
import format  from "../../Hooks/formatTime";

function PlayControl(props:any) {
  const audioRef = useRef<any>(null);
  const scheduleRef = useRef<any>(null);
  const rangeRef = useRef<any>(null);

  const dispatch = useDispatch();
  const [currTime, setCurrTime] = useState<string>("00:00");

  const currentSong: CurrentSong = useSelector(
    (state: any) => state.playSongSlice
  );

  const songList: SongList = useSelector((state: any) => state.SongListSlice);

  const { data, isSuccess, loading, axiosRequire } = useAxios();

  useEffect(() => {
    axiosRequire(`/song/url?id=${currentSong.id}`);
  }, [currentSong.id]);
  useLayoutEffect(()=>{
    return ()=>{
     if(props.type!=='exit'){
      audioRef.current&& dispatch(saveRange(audioRef.current.currentTime))
     }
    }
  },[])

  

  const endTime = format(currentSong.dTime);

  //开始播放时间
  const listenPlayHandler = (e: any) => {

  if(props.type==='exit')  audioRef.current.currentTime=currentSong.currentTime
    dispatch(
      switchSong({
        url: data.data[0].url,
        id: currentSong.id,
      })
    );
 
    dispatch(playHandler());

    setCurrTime(format(audioRef.current.currentTime * 1000));
   
  };
  const listenPauseHandler = () => {
    dispatch(pauseHandler());
 
    if (
      audioRef.current.currentTime * 1000 >= currentSong.dTime ||
      (currentSong.fee !== 0 &&
        currentSong.fee !== 8 &&
        audioRef.current.currentTime > 30)
    ) {
      nextHandler();
    }
   
  };
  //进度条变化
  const rangeHandler = throttle((e: any) => {
    //@ts-ignore
    setCurrTime(format(e.target.currentTime * 1000));
    let schedule =
      -700 * (1 - (e.target.currentTime * 1000) / currentSong.dTime);
    if (scheduleRef.current) {
      scheduleRef.current.style.transform = `translateX(${schedule}rem)`;
    }
   
  }, 1500);

  //切换下一首
  const nextHandler = () => {
   
    let index = songList.lists.findIndex((item) => item.id === currentSong.id);
    if (index + 1 >= songList.lists.length) {
      index = 0;
    } else {
      index = index + 1;
    }
    dispatch(switchHandler(songList.lists[index].id));
  };
  //切换上一首
  const preHandler = () => {
    let index = songList.lists.findIndex((item) => item.id === currentSong.id);
    if (index - 1 < 0) {
      index = songList.lists.length - 1;
    } else {
      index = index - 1;
    }
    dispatch(switchHandler(songList.lists[index].id));
  };
  const rangeClickHandler = (e: any) => {
    const margin =
      (document.documentElement.clientWidth - e.target.offsetWidth) / 2;
    if (e.clientX - margin > 0) {
      const rage = (e.clientX - margin) / e.target.offsetWidth;
      const jumpTime = (rage * currentSong.dTime) / 1000;
      audioRef.current.currentTime = jumpTime;
    }
  };
  return (
    <div className={classes.playComponent}>
      <div className={classes.rangeWrap}>
        {isSuccess && (
          <audio
            ref={audioRef}
            onTimeUpdate={rangeHandler}
            onPlay={listenPlayHandler}
            onPause={listenPauseHandler}
            autoPlay
            src={data.data[0].url}
          ></audio>
        )}

        <div
          ref={rangeRef}
          onClick={rangeClickHandler}
          className={classes.range}
        >
          <span ref={scheduleRef} className={classes.schedule}></span>
        </div>
        <div className={classes.timeWrap}>
          <span className={classes.startTime}>{currTime}</span>
          <span>无损</span>
          <span className={classes.endTime}>{endTime}</span>
        </div>
      </div>
      <div className={classes.control}>
        <FontAwesomeIcon className={classes.loop} icon={faRotateLeft} />
        <FontAwesomeIcon
          onClick={preHandler}
          className={classes.pre}
          icon={faBackwardStep}
        />
        {!currentSong.playState && (
          <FontAwesomeIcon
            onClick={() => {
              audioRef.current.play();
              dispatch(playHandler());
            }}
            className={classes.play}
            icon={faPlay}
          />
        )}
        {currentSong.playState && (
          <FontAwesomeIcon
            onClick={() => {
              audioRef.current.pause();
              dispatch(pauseHandler());
            }}
            className={classes.pause}
            icon={faPause}
          />
        )}

        <FontAwesomeIcon
          onClick={nextHandler}
          className={classes.next}
          icon={faForwardStep}
        />
        <FontAwesomeIcon className={classes.list} icon={faBarsStaggered} />
      </div>
    </div>
  );
}

export default memo(PlayControl);
