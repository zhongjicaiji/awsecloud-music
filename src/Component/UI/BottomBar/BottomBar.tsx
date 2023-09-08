import {
  faHouse,
  faMusic,
  faMicrophoneLines,
  faComments,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./BottomBar.module.css";

function BottomBar() {
  return (
    <div className={classes.BottomBar}>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faHouse} />
        </div>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faMusic} />
      </div>

      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faMicrophoneLines} />
      </div>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faComments} />
      </div>
      <div className={classes.iconWrap}>
        <FontAwesomeIcon className={classes.icon} icon={faUser} />
      </div>
    </div>
  );
}

export default BottomBar;
