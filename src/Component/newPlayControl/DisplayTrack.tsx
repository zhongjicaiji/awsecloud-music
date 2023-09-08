import React from "react";



function DisplayTrack({
  currentSongUrl,
  audioRef,
  progressBarRef,

  changeSong,
  duration
}: {
  currentSongUrl: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;

  changeSong: Function;
  duration:number
}) {
  const onLoadedMetaDate = () => {
    if (progressBarRef.current) {
      progressBarRef.current.max = (duration/1000) as unknown as string;
    }
  };


  return (
    <div>
      <audio
        onEnded={() => {
          changeSong("next");
        }}
        
        onLoadedMetadata={onLoadedMetaDate}
        src={currentSongUrl}
        ref={audioRef}
      
      ></audio>
    </div>
  );
}

export default  DisplayTrack;
