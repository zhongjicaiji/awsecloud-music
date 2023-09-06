import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { toggleHandler } from "../../store/reducer/PlaySongSlice";

function DisplayTrack({
  currentSongUrl,
  audioRef,
  progressBarRef,
  setDuration,
  changeSong,
}: {
  currentSongUrl: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  setDuration: Function;
  changeSong: Function;
}) {
  const dispatch = useDispatch();
  const onLoadedMetaDate = () => {
    if (progressBarRef.current) {
      setDuration(audioRef.current?.duration);
      progressBarRef.current.max = audioRef.current
        ?.duration as unknown as string;
    }
  };
//   const playHandler = () => {
//     console.log(2)
//     dispatch(toggleHandler(true));
//   };
//   const pauseHandler = () => {
//     console.log(1)
//     dispatch(toggleHandler(false));
//   };

  return (
    <div>
      <audio
        onEnded={() => {
          changeSong("next");
        }}
        onLoadedMetadata={onLoadedMetaDate}
        src={currentSongUrl}
        ref={audioRef}
        // onPlay={playHandler}
        // onPause={pauseHandler}
      ></audio>
    </div>
  );
}

export default DisplayTrack;
