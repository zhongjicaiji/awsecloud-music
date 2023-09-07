import React, { useEffect, useCallback, useRef, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faBackwardStep,
  faForward,
  faForwardStep,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./style.module.css";
import { toggleHandler } from "../../store/reducer/PlaySongSlice";
import { useSelector, useDispatch } from "react-redux";
import { CurrentSong } from "../../interface/responseInter";
import useDebounce from "../Hooks/useDebounce";



function PlayControls({
  audioRef,
  setTimeProgress,
  progressBarRef,
  duration,
  changeSong,

 
}: {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  setTimeProgress: Function;
  duration: number;
  changeSong: Function;
}) {

  const dispatch=useDispatch()
const currentSong:CurrentSong=useSelector((state:any)=>state.playSongSlice)
 

  const toggleState = () => {
console.log(1)
    dispatch(toggleHandler(!currentSong.playState))
    
  };

  const playAnimationRef = useRef(0);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);

    if (progressBarRef.current) {
      progressBarRef.current.value = currentTime as unknown as string;
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(+progressBarRef.current.value / (duration/1000)) * 100}%`
      );
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {

    if (currentSong.playState) {
     const promiseAudio= audioRef.current!.play();
        promiseAudio.then(res=>{
        },rej=>{
          audioRef.current?.pause()
        }).catch(err=>{
          console.log(err)
        })
    } else {
      audioRef.current!.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [currentSong.playState, audioRef, repeat]);

  const backSkipHandler = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };
  const forwardSkipHandler = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };
  const preHandler =useDebounce( () => {
    changeSong("pre");
  },500)
  const nextHandler =useDebounce(() => {
    changeSong("next");
  },500) 

  return (
    <div className={classes.controlsWrap}>
      <button onClick={preHandler} title="上一首">
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>
      <button onClick={backSkipHandler} title="后退">
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button className={classes.playBtn} onClick={toggleState}>
        {currentSong.playState ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <button onClick={forwardSkipHandler} title="快进">
        <FontAwesomeIcon icon={faForward} />
      </button>
      <button onClick={nextHandler} title="下一首">
        <FontAwesomeIcon icon={faForwardStep} />
      </button>
    </div>
  );
}

export default memo(PlayControls) ;
