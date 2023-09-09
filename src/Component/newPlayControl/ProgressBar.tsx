import React, { memo } from "react";

import "./reactAudio.css";
import classes from "./style.module.css";
import format from "../Hooks/formatTime";
import useDebounce from "../Hooks/useDebounce";

function ProgressBar({
  progressBarRef,
  audioRef,
  duration,
  timeProgress,

}: {
  progressBarRef: React.RefObject<HTMLInputElement>;
  audioRef:React.RefObject<HTMLAudioElement>;
  duration:number,
  timeProgress:number
 
}) {

   
  const  progressChangeHandler =() => {
   
    if( audioRef.current){
      
        audioRef.current.currentTime=Number(progressBarRef.current?.value );
    }
  }

  return (
    <div className={classes.progressWrap}>
      <span className={`${classes.time} ${classes.currentTime}`}>{format(timeProgress*1000)}</span>
      <input
        onChange={progressChangeHandler}
        ref={progressBarRef}
        type="range"
        defaultValue={0}
      />
      <span className={`${classes.time} `}>{format(duration)}</span>
    </div>
  );
}

export default  ProgressBar ;
