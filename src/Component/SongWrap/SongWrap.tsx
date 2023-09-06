
import classes from "./SongWrap.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCirclePlay,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { playSongsT } from "../../interface/responseInter";
import SongCart from "./SongCart/SongCart";
import ScrollItem from "../UI/Scollitem/Scollitem";
import { useDispatch, useSelector } from "react-redux";
import { initSong } from "../../store/reducer/SongListSlice";

function SongWrap(props: playSongsT) {
  const SongList = useSelector((state: any) => state.SongListSlice);
  const dispatch = useDispatch();

  const playAllHandler = (e: any) => {
    e.stopPropagation();
    dispatch(initSong(props.trackIds));
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <div className={classes.playHandler}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faCirclePlay}
            style={{ color: "#d62448" }}
          />
          <h2 onClick={playAllHandler} className={classes.headerTitle}>
            播放全部
          </h2>
          <span className={classes.songCount}>({props.count})</span>
        </div>
        <div className={classes.songSet}>
          <FontAwesomeIcon className={classes.icon} icon={faArrowDown} />
          <FontAwesomeIcon className={classes.icon} icon={faListCheck} />
        </div>
      </div>
      <div className={classes.body} onClick={playAllHandler}>
        {props.trackIds?.map((item, index) => (
          <ScrollItem key={item.id}>
            <SongCart index={index + 1} {...item} />{" "}
          </ScrollItem>
        ))}
      </div>
    </div>
  );
}

export default SongWrap;
