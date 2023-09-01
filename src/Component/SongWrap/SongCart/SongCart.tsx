import React, { useEffect, useState } from "react";
import { SongT, trackIdT } from "../../../interface/responseInter";
import useAxios from "../../Hooks/useAxios";
import classes from "./SongCart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate,useLocation } from "react-router-dom";

interface SongCartT extends trackIdT {
  index: number;
}

function SongCart(props: SongCartT) {
  const toPlay = useNavigate();
  const [songCartData, setSongCartData] = useState<SongT>();
  const { data, loading, isSuccess, axiosRequire } = useAxios();
  const local=useLocation()



  const toPlayHandler=()=>{
    toPlay(`/playPage/${songCartData?.id}`,{
      state:{
        backPath:local.pathname,
        currentPage:local.state,
      },
      replace:false,  
    })
  }


  useEffect(() => {
    axiosRequire(`/song/detail?ids=${props.id}`);
  }, []);
  useEffect(() => {
    loading && setSongCartData(data.songs[0]);
  }, [isSuccess]);

  return (
    <div onClick={toPlayHandler} className={classes.wrap}>
      <div className={classes.info}>
        <span className={classes.index}>{props.index}</span>
        <div className={classes.songMes}>
          <h3 className={classes.songName}>{songCartData?.name}</h3>
          <div className={classes.descWrap}>
            {songCartData?.fee === 1 && (
              <span className={classes.vip}>VIP</span>
            )}
            <span className={classes.quality}>高品质</span>
            <span className={classes.desc}>
              {songCartData?.ar[0].name} - {songCartData?.name}
            </span>
          </div>
        </div>
      </div>
      <FontAwesomeIcon className={classes.setting} icon={faEllipsisVertical} />
    </div>
  );
}

export default SongCart;
