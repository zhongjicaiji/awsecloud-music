
import classes from "./SongWrap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCirclePlay,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { playSongsT } from "../../interface/responseInter";
import SongCart from "./SongCart/SongCart";
import { useGetAllSongInfoQuery } from "../../store/Api/songApi";
import Loading from "../UI/Loading/Loading";

function SongWrap(props: playSongsT) {

 let ids:number[]=props.trackIds.map(item=>item.id) 
  const {data,isSuccess}=useGetAllSongInfoQuery(ids)

  

  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <div className={classes.playHandler}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faCirclePlay}
            style={{ color: "#d62448" }}
          />
          <h2  className={classes.headerTitle}>
            播放全部
          </h2>
          <span className={classes.songCount}>({props.count})</span>
        </div>
        <div className={classes.songSet}>
          <FontAwesomeIcon className={classes.icon} icon={faArrowDown} />
          <FontAwesomeIcon className={classes.icon} icon={faListCheck} />
        </div>
      </div>
      <div className={classes.body}  >
      {isSuccess?data.map((item,index, allSongs)=><SongCart key={item.id} list={allSongs} detail={{...item}} index={index+1}></SongCart>):<Loading/>}
      </div>
    </div>
  );
}

export default SongWrap;
