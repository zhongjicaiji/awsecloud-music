import React,{useEffect} from "react";
import classes from "./PlayPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackwardStep, faBarsStaggered, faCommentDots, faForwardStep, faHeart, faPause, faPlay, faRotateLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { playHandler,pauseHandler } from "../../store/reducer/PlaySongSlice";
import { CurrentSong } from "../../interface/responseInter";


function PlayPage() {
  const currentSong=useSelector((state:any)=>state.playSongSlice) as CurrentSong
  const back=useNavigate()
  
  const param=useParams()
  const local=useLocation()
  const dispatch=useDispatch()
  const endTime=Math.floor(currentSong.dTime/1000/60)+':'+Math.floor(currentSong.dTime/1000)%60
  




  const backHandler=()=>{
    back(local.state.backPath,{
      replace:true,
      state:{
        backPath:local.state.currentPage.backPath
      }
    })
  }


  
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <FontAwesomeIcon onClick={backHandler} className={`${classes.icon}`} icon={faArrowLeft} />
        <div className={classes.songName}>{currentSong.name}</div>
        <FontAwesomeIcon icon={faShareNodes} />
      </div>
      <div className={classes.dishDrop}>
        <div className={classes.dish}>
          <div className={classes.imgWrap}>
            <img className={classes.img} src={currentSong.picUrl} alt="专辑封面" />
          </div>
        </div>
      </div>

      <div className={classes.Context}>
          <div className={classes.songContext}>
            <div className={classes.info}>
            <div className={classes.minSongName}>{currentSong.name}</div>
                <div className={classes.artist}>
                  <span className={classes.artistName}>{currentSong.artistName}</span>
                  <span className={classes.interest}>关注</span>
                  </div>
            </div>
            <div  className={classes.like}>
                <span className={classes.count}>999+</span>
            <FontAwesomeIcon  icon={faHeart} />

            </div>
          
        <div className={classes.comment}>
        <span className={classes.count}>999+</span>
        <FontAwesomeIcon  icon={faCommentDots} />

        </div>
              
          </div>


          <div className={classes.rangeWrap}>
             <div className={classes.range}>
               <span className={classes.schedule}></span>
             </div>
             <div className={classes.timeWrap}>

                 <span className={classes.startTime}>00:00</span>
                 <span>无损</span>
                 <span className={classes.endTime}>{endTime}</span>
             </div>
          </div>
          <div className={classes.control}>
          <FontAwesomeIcon className={classes.loop} icon={faRotateLeft} />
          <FontAwesomeIcon className={classes.pre} icon={faBackwardStep} />
        {!currentSong.playState&& <FontAwesomeIcon onClick={()=>{dispatch(playHandler())}}  className={classes.play} icon={faPlay} />} 
        {currentSong.playState&&  <FontAwesomeIcon onClick={()=>{dispatch(pauseHandler())}}  className={classes.pause} icon={faPause} />}
      
          <FontAwesomeIcon className={classes.next} icon={faForwardStep} />
          <FontAwesomeIcon className={classes.list} icon={faBarsStaggered} />
          </div>
      </div>
    </div>
  );
}

export default PlayPage;
