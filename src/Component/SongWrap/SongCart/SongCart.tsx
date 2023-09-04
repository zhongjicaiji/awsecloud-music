import React, { useEffect, useState ,memo} from "react";
import { SongT, trackIdT,CurrentSong } from "../../../interface/responseInter";
import useAxios from "../../Hooks/useAxios";
import classes from "./SongCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initSongHandler } from "../../../store/reducer/PlaySongSlice";
import { forward } from "../../../store/router/RouteStack";


interface SongCartT extends trackIdT {
  index: number;
}

function SongCart(props: SongCartT) {
 
  const toPlay = useNavigate();
  const [songCartData, setSongCartData] = useState<SongT>();
  const { data, loading, isSuccess, axiosRequire } = useAxios();
  const local=useLocation()
  const dispatch=useDispatch()
  const initHandler=()=>{
    dispatch(initSongHandler({
      
        id:songCartData?.id,
        playState:true,
        name:songCartData?.name,
        dTime:songCartData?.dt,
        picUrl:songCartData?.al?.picUrl,
        fee:songCartData?.fee,
        artistName:songCartData?.ar![0].name

    }))
  }
 
  const clickHandler=()=>{
 
    toPlayHandler()
    initHandler()
   
  }


  const toPlayHandler=()=>{
    dispatch(forward(`/playPage/${songCartData?.id}`))
    toPlay(`/playPage/${songCartData?.id}`,{ replace:false })
  }

  useEffect(() => {
    axiosRequire(`/song/detail?ids=${props.id}`);
  }, []);
  useEffect(() => {
    loading && setSongCartData(data.songs[0]);
  }, [isSuccess]);

  return (
    
    
    
     <div onClick={clickHandler} className={classes.wrap}>
     <div className={classes.info}>
       <span className={classes.index}>{props.index}</span>
       <div className={classes.songMes}>
         <h3 className={classes.songName}>{songCartData?.name}</h3>
         <div className={classes.descWrap}>
           {songCartData?.fee === 1&& (
             <span className={classes.vip}>VIP</span>
           )}
           {songCartData?.fee === 4&& (
             <span className={classes.vip}>付费</span>
           )}
           <span className={classes.quality}>高品质</span>
           <span className={classes.desc}>
             {songCartData?.ar![0].name} - {songCartData?.name}
           </span>
         </div>
       </div>
     </div>
     <FontAwesomeIcon className={classes.setting} icon={faEllipsisVertical} />
   </div>
 
 
 
  );
}

export default memo(SongCart) ;
