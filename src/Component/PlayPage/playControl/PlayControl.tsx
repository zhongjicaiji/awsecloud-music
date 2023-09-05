import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
  useLayoutEffect,
  ReactEventHandler,
  ReactElement,
  MouseEventHandler,
} from "react";
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
  saveRange,
} from "../../../store/reducer/PlaySongSlice";
import { CurrentSong, SongList } from "../../../interface/responseInter";
import { switchSong } from "../../../store/reducer/SongListSlice";
import format from "../../Hooks/formatTime";
import { useGetSongUrlQuery } from "../../../store/Api/songApi";
interface HTMLMediaElementEventMap {
  timeupdate: React.SyntheticEvent<HTMLMediaElement> & {
    target: HTMLMediaElement & {
      currentTime: number;
    };
  };
  click: React.MouseEvent & {
    target: HTMLElement;
  };
}

function PlayControl(props: any) {
  const audioRef = useRef<any>(null);
  const scheduleRef = useRef<any>(null);
  const rangeRef = useRef<any>(null);

  const dispatch = useDispatch();
  const [currTime, setCurrTime] = useState<string>("00:00");

  const currentSong: CurrentSong = useSelector(
    (state: any) => state.playSongSlice
  );
  const {
    data: songUrlData,
    isSuccess: getUrlSuccess,
    refetch,
  } = useGetSongUrlQuery(currentSong.id);

  const songList: SongList = useSelector((state: any) => state.SongListSlice);
  const endTime = format(currentSong.dTime);

  useEffect(() => {
   refetch()
  }, [currentSong.id]);

  useLayoutEffect(() => {
    return () => {
      if (props.type !== "exit") {
        audioRef.current && dispatch(saveRange(audioRef.current.currentTime));
      }
    };
  }, []);

  //刷新页面时暂停音乐
  // window.onbeforeunload = function () {
  //   dispatch(pauseHandler());
  // };

  useEffect(() => {
    if( audioRef.current && currentSong.playState ){
      const promiseAudio:Promise<AudioContext>= audioRef.current.play();
      if(promiseAudio!==undefined){
        promiseAudio.then(res=>{
         
        },reject=>{
          dispatch(pauseHandler());
        }).catch(err=>{
          console.log(err)
        })
      }
    }

  });


  //开始播放时间
  const listenPlayHandler = (e: any) => {
    if (props.type === "exit")
      audioRef.current.currentTime = currentSong.currentTime;
    dispatch(
      switchSong({
        url:songUrlData.url,
        id: currentSong.id,
      })
    );

    dispatch(playHandler());

    setCurrTime(format(audioRef.current.currentTime * 1000));
  };
  const listenPauseHandler = (e: HTMLMediaElementEventMap["timeupdate"]) => {
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
  const rangeHandler = throttle((e: HTMLMediaElementEventMap["timeupdate"]) => {
    setCurrTime(format(e.target.currentTime * 1000));
    let schedule =
      -700 * (1 - (e.target.currentTime * 1000) / currentSong.dTime);
    if (scheduleRef.current) {
      scheduleRef.current.style.transform = `translateX(${schedule}rem)`;
    }
  }, 1500);

  const changeSong=useCallback((type:string)=>{
    let index = songList.lists.findIndex((item) => item.id === currentSong.id);
    if(type==='next'){
      if (index + 1 >= songList.lists.length) {
        index = 0;
      } else {
        index = index + 1;
      }
    }else if(type==='pre'){
      if (index - 1 < 0) {
        index = songList.lists.length - 1;
      } else {
        index = index - 1;
      }
    }
    dispatch(playHandler())
    dispatch(switchHandler(songList.lists[index].id));
  },[currentSong.id])

  //切换下一首
  const nextHandler = () => {
   changeSong('next')
  };
  //切换上一首
  const preHandler = () => {
  changeSong('pre')
  };
  const rangeClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const margin =
      (document.documentElement.clientWidth -
        (e.target as HTMLElement).offsetWidth) /
      2;
    if (e.clientX - margin > 0) {
      const rage = (e.clientX - margin) / (e.target as HTMLElement).offsetWidth;
      const jumpTime = (rage * currentSong.dTime) / 1000;
      audioRef.current.currentTime = jumpTime;
    }
  };
  return (
    <div className={classes.playComponent}>
      <div className={classes.rangeWrap}>
        {getUrlSuccess && (
          <audio
            ref={audioRef}
            onTimeUpdate={rangeHandler}
            onPlay={listenPlayHandler}
            onPause={listenPauseHandler}
            src={songUrlData.url}
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
