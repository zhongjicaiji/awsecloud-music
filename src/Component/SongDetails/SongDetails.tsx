import { useState, useEffect, Suspense, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { sheetDetailT } from "../../interface/responseInter";
import classes from "./SongDetails.module.css";
import TopMange from "../UI/TopMange/TopMange";
import {
  faAngleRight,
  faChevronDown,
  faCommentDots,
  faPlay,
  faPlus,
  faShare,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../UI/Loading/Loading";
import SongWrap from "../SongWrap/SongWrap";

interface paramT {
  id?: string;
}

function SongDetails() {
  const [songDetails, setSongDetail] = useState<sheetDetailT>();
  const { data, loading,isSucess, axiosRequire } = useAxios();
  const param: paramT = useParams();
  const local = useLocation();
 



  
  useEffect(() => {
    axiosRequire(`/playlist/detail?id=${param.id}`);
  }, []);
  useEffect(() => {
    isSucess && setSongDetail(data.playlist);
     
  }, [isSucess]);


  return (
    <Fragment>
 <div  className={classes.wrap}>
          <TopMange  positioning={local.state} />
          <div className={classes.header}>
            <div className={classes.headerBody}>
              <div className={classes.imgWrap}>
                <img
                  className={classes.coverImg}
                  src={songDetails?.coverImgUrl}
                  alt={songDetails?.name}
                />
                <div className={classes.playCount}>
                <FontAwesomeIcon icon={faPlay} />
                <span>{songDetails?.playCount}</span>
                </div>
                 
              </div>
              <div className={classes.info}>
                <p className={classes.title}>{songDetails?.name}</p>
                <div className={classes.creator}>
                  <div className={classes.avatarImgWrap}>
                    <img
                      className={classes.avatar}
                      src={songDetails?.creator.avatarUrl}
                      alt="头像"
                    />
                  </div>

                  <span>{songDetails?.creator.nickname}</span>

                  <div className={classes.interest}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>关注</span>
                  </div>
                </div>
                <div>
                  {songDetails?.tags.slice(0, 3).map((item) => (
                    <span key={item} className={classes.tag}>{item}</span>
                  ))}
                </div>
              </div>
              <div className={classes.more}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className={classes.descWrap}>
              <p className={classes.desc}>{songDetails?.description}</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div className={classes.sheetData}>
             <div className={classes.share}>
             <FontAwesomeIcon className={classes.icon} icon={faShare} />
                    <span>{songDetails?.shareCount}</span>
             </div>
             <div className={classes.comment}>
             <FontAwesomeIcon className={classes.icon} icon={faCommentDots} />
                    <span>{songDetails?.commentCount}</span>
             </div>
             <div className={classes.subscribed}>
             <FontAwesomeIcon className={classes.icon} icon={faSquarePlus} />
                    <span>{songDetails?.trackCount}</span>
             </div>
            </div>
          </div>

          <SongWrap count={songDetails?.trackCount} trackIds={songDetails?.trackIds}/>
        </div>
     

    </Fragment>
  
   
 
   

  );
}

export default SongDetails;
