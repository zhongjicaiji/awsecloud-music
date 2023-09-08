import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./style.module.css";
import DisplayTrack from "./DisplayTrack";
import NewPlayControls from "./NewPlayControls";
import ProgressBar from "./ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { SongList, CurrentSong } from "../../interface/responseInter";
import { useGetSongUrlQuery } from "../../store/Api/songApi";
import {
  switchHandler,
  toggleHandler,
} from "../../store/reducer/PlaySongSlice";
import { changeSong as newSong } from "../../store/reducer/SongListSlice";
import useInitSong from "../Hooks/initData";
import useColorThief from "../Hooks/MyColorThief";

function AudioPlayer() {
  const dispatch = useDispatch();
  const initSong = useInitSong();
  const colorThief = useColorThief();
  const songList: SongList = useSelector((state: any) => state.SongListSlice);
  const currentSong: CurrentSong = useSelector(
    (state: any) => state.playSongSlice
  );
  const { data, isSuccess, refetch } = useGetSongUrlQuery(
    songList.currentSongId
  );
  const imgRef = useRef<HTMLImageElement>(null);

  const [index, setIndex] = useState(songList.currentIndex);
  const [timeProgress, setTimeProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const changeSong = useCallback(
    (type: string) => {
     
      let tmpIndex: number = index;

      if (type === "next") {
        if (index + 1 >= songList.lists.length) {
          setIndex(0);
          tmpIndex = 0;
        } else {
          setIndex(index + 1);
          tmpIndex += 1;
        }
      } else if (type === "pre") {
        if (index - 1 < 0) {
          setIndex(songList.lists.length - 1);
          tmpIndex = songList.lists.length - 1;
        } else {
          setIndex(index - 1);
          tmpIndex -= 1;
        }
      }
      const newData = songList.lists[tmpIndex];
      if(newData.id===0) return
      dispatch(
        newSong({
          id: songList.lists[tmpIndex].id,
          index: tmpIndex,
        })
      );
  
      initSong(newData);
      dispatch(switchHandler(songList.lists[tmpIndex].id));
      dispatch(toggleHandler(true));
      refetch();
    },
    [songList.currentSongId, index, audioRef.current]
  );

  useEffect(() => {
    if (currentSong.playState && audioRef.current) {
      const promiseAudio = audioRef.current.play();
      if (promiseAudio !== undefined) {
        promiseAudio
          .then((res) => {})
          .catch((err) => {
            audioRef.current?.pause();
            setTimeout(() => {
              audioRef.current?.play();
            }, 1000);
          });
      }
    }
  }, [audioRef.current, songList.currentSongId]);

  return (
    <div className={classes.audioPlayer}>
      <div hidden>
        <img
          onLoad={() => {
            imgRef.current && colorThief(imgRef.current);
          }}
          ref={imgRef}
          src={currentSong.picUrl}
      
        />
      </div>

      <div className={classes.inner}>
        <DisplayTrack
          currentSongUrl={isSuccess ? data.url : ""}
          {...{ audioRef, progressBarRef, changeSong }}
          duration={currentSong.dTime}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress }}
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

export default memo(AudioPlayer);
