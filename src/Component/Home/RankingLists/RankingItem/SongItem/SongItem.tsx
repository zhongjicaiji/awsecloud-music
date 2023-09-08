import React,{useEffect, useRef} from "react";
import { artist } from "../../../../../interface/propsInterface";
import classes from "./SongItem.module.css";

interface rankingSong {
 
  no: number;
  name: string;
  artistName:string ;
}
function SongItem(props: rankingSong) {
   const noRef= useRef<any>(null)

   useEffect(()=>{
    switch(props.no){
      case 1:{
         noRef.current.className=' '+classes.no1;
          break
      }
      case 2:{
          noRef.current.className=' '+classes.no2
          break
      }
      case 3:{
          noRef.current.className=' '+classes.no3
      }
    }
   },[])

  return (
    <div className={classes.wrap}>
      <div className={classes.info}>
        <div ref={noRef}>{props.no}</div>
        <div className={classes.songInfo}>
          <div className={classes.songName}>{props.name}</div>
          <div className={classes.arName}>{props.artistName}</div>
        </div>
      </div>
      <div className={classes.desc}>热门</div>
    </div>
  );
}

export default SongItem;
