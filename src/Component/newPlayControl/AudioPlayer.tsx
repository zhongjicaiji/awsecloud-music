import React, { memo, useCallback, useEffect, useRef, useState,useLayoutEffect } from "react";
import classes from "./style.module.css";
import DisplayTrack from "./DisplayTrack";
import NewPlayControls from "./NewPlayControls";
import ProgressBar from "./ProgressBar";
import { useSelector,useDispatch } from "react-redux";
import { SongList, SongT ,CurrentSong} from "../../interface/responseInter";
import { useGetSongUrlQuery } from "../../store/Api/songApi";
import { switchHandler ,toggleHandler,initSongHandler} from "../../store/reducer/PlaySongSlice";
import { changeSong as newSong, } from "../../store/reducer/SongListSlice";
import useInitSong  from "../Hooks/initData";

function AudioPlayer() {
    const dispatch=useDispatch()
    const initSong=useInitSong()
  const songList: SongList = useSelector((state: any) => state.SongListSlice);
  const currentSong:CurrentSong=useSelector((state:any)=>state.playSongSlice)

  const { data, isSuccess, refetch } = useGetSongUrlQuery(songList.currentSongId);

  const [index,setIndex]=useState(songList.currentIndex)
    // const [duration,setDuration]=useState<number>()
  const [timeProgress, setTimeProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const changeSong = useCallback(
    (type: string) => {
        console.log(currentSong.id)
   let tmpIndex:number=index
  
      if (type === "next") {
        if (index + 1 >= songList.lists.length) {
        setIndex(0)
        tmpIndex=0
        } else {
            setIndex(index+1)
            tmpIndex+=1
        }
      } else if (type === "pre") {
        if (index - 1 < 0) {
            setIndex(songList.lists.length-1)
            tmpIndex=songList.lists.length-1
  
        } else {
            setIndex(index-1)
            tmpIndex-=1
        }
      }
      dispatch(newSong({
        id:songList.lists[tmpIndex].id,
        index:tmpIndex
      }
      ))
     const newData=songList.lists[tmpIndex]
     initSong(newData)
      dispatch(switchHandler(songList.lists[tmpIndex].id));
      dispatch(toggleHandler(true))
      refetch()
    },
    [songList.currentSongId,index,audioRef.current]
  );
 
useEffect(()=>{
    if(currentSong.playState&&audioRef.current){
   
     const promiseAudio=audioRef.current.play()
     if(promiseAudio!==undefined){
        promiseAudio.then(res=>{

        }).catch(err=>{

        audioRef.current?.pause()
        setTimeout(()=>{
            console.log(err)
          
                audioRef.current?.play()
       
     
         
        },1000)
         })
     }
    }


},[audioRef.current,songList.currentSongId])



  return (
    <div className={classes.audioPlayer}>
      <div className={classes.inner}>
        <DisplayTrack
          currentSongUrl={isSuccess ? data.url : ""}
          {...{ audioRef, progressBarRef, changeSong } }
          duration={currentSong.dTime}
        />
          <ProgressBar
          {...{ progressBarRef, audioRef,timeProgress }}
          duration={currentSong.dTime}
        />
        <NewPlayControls
          {...{
            audioRef,
            setTimeProgress,
            progressBarRef,
            changeSong,
            songList,
          }}
          duration={currentSong.dTime}
        />
      
      </div>
    </div>
  );
}

export default memo(AudioPlayer) ;
