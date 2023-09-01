import React from "react";
import classes from "./PlayPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBackwardStep, faBarsStaggered, faCommentDots, faForwardStep, faHeart, faPause, faPlay, faRotateLeft, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function PlayPage() {
  const back=useNavigate()
  const param=useParams()
  const local=useLocation()

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
        <div className={classes.songName}>雪distance</div>
        <FontAwesomeIcon icon={faShareNodes} />
      </div>
      <div className={classes.dishDrop}>
        <div className={classes.dish}></div>
      </div>

      <div className={classes.Context}>
          <div className={classes.songContext}>
            <div className={classes.info}>
            <div className={classes.songName}>喜羊羊与灰太狼</div>
                <div className={classes.artist}>
                  <span className={classes.artistName}>喜羊羊合唱团</span>
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
                 <span className={classes.endTime}>01:30</span>
             </div>
          </div>
          <div className={classes.control}>
          <FontAwesomeIcon className={classes.loop} icon={faRotateLeft} />
          <FontAwesomeIcon className={classes.pre} icon={faBackwardStep} />
          <FontAwesomeIcon className={classes.play} icon={faPlay} />
          {/* <FontAwesomeIcon className={classes.pause} icon={faPause} /> */}
          <FontAwesomeIcon className={classes.next} icon={faForwardStep} />
          <FontAwesomeIcon className={classes.list} icon={faBarsStaggered} />
          </div>
      </div>
    </div>
  );
}

export default PlayPage;
