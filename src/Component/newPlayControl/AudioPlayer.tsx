import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classes from "./style.module.css";
import DisplayTrack from "./DisplayTrack";
import NewPlayControls from "./NewPlayControls";
import ProgressBar from "./ProgressBar";
import { useDispatch } from "react-redux";
import { useGetSongUrlQuery } from "../../store/Api/songApi";
import {
  switchHandler,
  toggleHandler,
} from "../../store/reducer/PlaySongSlice";
import { changeSong as newSong } from "../../store/reducer/SongListSlice";
import useInitSong from "../Hooks/initData";
import useColorThief from "../Hooks/MyColorThief";
import { useNavigate } from "react-router-dom";
import { forward } from "../../store/router/RouteStack";
import { useLocation } from "react-router-dom";
import { useSelector } from "../../interface/useSelector";

function AudioPlayer() {
  const local = useLocation();
  const dispatch = useDispatch();
  const initSong = useInitSong();
  const colorThief = useColorThief();
  const nav = useNavigate();
  const songList = useSelector((state) => state.SongListSlice);
  const currentSong = useSelector((state) => state.playSongSlice);
  const { data, isSuccess, refetch } = useGetSongUrlQuery(
    songList.currentSongId
  );
  const imgRef = useRef<HTMLImageElement>(null);
  const [index, setIndex] = useState(songList.currentIndex);
  const [timeProgress, setTimeProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const [showStyle, setShowStyle] = useState<boolean>(false);

  const changeSong = useCallback(
    (type: string) => {
      let tmpIndex = index;

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
      if (newData.id === 0) return;
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
        promiseAudio.catch((err) => {
          audioRef.current?.pause();
          setTimeout(() => {
            audioRef.current?.play();
          }, 1000);
        });
      }
    }
  }, [audioRef.current, songList.currentSongId]);

  const toPlayPage = (e: React.MouseEvent) => {
    if (/^\/playPage\/\d+$/.test(local.pathname)) return;
    dispatch(forward(`/playPage/${songList.currentSongId}`));
    nav(`/playPage/${songList.currentSongId}`, {
      replace: false,
      state: {
        method: "PUSH",
      },
    });
  };

  useEffect(() => {
    const reg = /^\/playPage/;
    if (reg.test(local.pathname)) {
      setShowStyle(true);
    } else {
      setShowStyle(false);
    }
  }, [local.pathname]);

  return (
    <div
      onClick={toPlayPage}
      className={`${classes.audioPlayer} ${
        showStyle || classes.showBackground
      }`}
    >
      <div hidden={showStyle} className={classes.imgWrap}>
        <img
          onLoad={() => {
            imgRef.current && colorThief(imgRef.current);
          }}
          className={classes.img}
          ref={imgRef}
          src={currentSong.picUrl}
        />
      </div>
        <p hidden={showStyle} className={classes.name}>{currentSong.name}</p>
      <div className={classes.inner}>
        <div>
          <DisplayTrack
            currentSongUrl={isSuccess ? data.url : ""}
            {...{ audioRef, progressBarRef, changeSong }}
            duration={currentSong.dTime}
          />
        </div>
        <div hidden={!showStyle}>
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress }}
            duration={currentSong.dTime}
          />
        </div>
        <div>
          <NewPlayControls
            {...{
              audioRef,
              setTimeProgress,
              progressBarRef,
              changeSong,
              songList,
              showStyle,
            }}
            duration={currentSong.dTime}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
