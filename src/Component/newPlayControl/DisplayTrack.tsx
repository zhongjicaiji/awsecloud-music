import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LyricListT } from "../../interface/responseInter";
import { scrollLyric } from "../../store/reducer/LyricSlice";
import throttle from "../Hooks/useThrottle";

function DisplayTrack({
  currentSongUrl,
  audioRef,
  progressBarRef,

  changeSong,
  duration,
}: {
  currentSongUrl: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;

  changeSong: Function;
  duration: number;
}) {
  const LyricList: LyricListT = useSelector((state: any) => state.LyricSlice);
  const dispatch = useDispatch();
  const onLoadedMetaDate = () => {
    if (progressBarRef.current) {
      progressBarRef.current.max = (duration / 1000) as unknown as string;
    }
  };
  const scrollLyricHandler = () => {
    if (audioRef.current) {
      const tmpTime = audioRef.current.currentTime;
      const preIndex = LyricList.currentIndex;
      const list = LyricList.lyricList;
      for (let i =0; i < list.length; i++) {
        if (list[i + 1] && tmpTime >= list[i].time && tmpTime < list[i + 1].time){
          dispatch(
            scrollLyric({
              currentIndex: i,
              style: {
                transform: `translateY(${-80 * i}rem)`,
              },
            }
            )
          );
          return;
        }else if(!list[i + 1]&&tmpTime>=list[i].time&&preIndex!==i){
          dispatch(
            scrollLyric({
              currentIndex: i,
              style: {
                transform: `translateY(${-80 * i}rem)`,
              },
            }
            )
          );
        }
      }
    }
  };

  return (
    <div>
      <audio
        onEnded={() => {
          let timer = setTimeout(() => {
            changeSong("next");
            clearTimeout(timer);
          }, 500);
        }}
        onTimeUpdate={() => {
          let timer:number|null=null
          LyricList.showLyric?timer= requestAnimationFrame(scrollLyricHandler):(timer&&cancelAnimationFrame(timer));
        }}
        onLoadedMetadata={onLoadedMetaDate}
        src={currentSongUrl}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default DisplayTrack;
