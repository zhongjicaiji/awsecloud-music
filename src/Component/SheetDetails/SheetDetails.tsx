import { Fragment} from "react";
import {  useParams } from "react-router-dom";

import classes from './SheetDetails.module.css';
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
import { useGetSheetInfoQuery } from "../../store/Api/songApi";




interface paramT {
  id?: string;
}

function SheetDetails() {



  const param: paramT = useParams();

  const {data:sheetDetailData,isSuccess:getSheetDetailSuccess}=useGetSheetInfoQuery(Number(param.id))

  let playCount:string|number|undefined=sheetDetailData?.playCount
  if(playCount!==undefined){
    if(playCount>10000) playCount=Math.ceil(playCount/10000)+'万'
   else if(playCount>10**8) playCount=Math.ceil(playCount/(10**8))+"亿"
  }


  return (
    <Fragment>
    
   <div className={classes.wrap}>
          <TopMange   />
          <div className={classes.header}>
            <div className={classes.headerBody}>
              <div className={classes.imgWrap}>
                <img
                  className={classes.coverImg}
                  src={sheetDetailData?.coverImgUrl}
                  alt={sheetDetailData?.name}
                />
                <div className={classes.playCount}>
                <FontAwesomeIcon icon={faPlay} />
                <span>{playCount}</span>
                </div>
                 
              </div>
              <div className={classes.info}>
                <p className={classes.title}>{sheetDetailData?.name}</p>
                <div className={classes.creator}>
                  <div className={classes.avatarImgWrap}>
                    <img
                      className={classes.avatar}
                      src={sheetDetailData?.creator.avatarUrl}
                      alt="头像"
                    />
                  </div>

                  <span>{sheetDetailData?.creator.nickname}</span>

                  <div className={classes.interest}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>关注</span>
                  </div>
                </div>
                <div>
                  {sheetDetailData?.tags.slice(0, 3).map((item) => (
                    <span key={item} className={classes.tag}>{item}</span>
                  ))}
                </div>
              </div>
              <div className={classes.more}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            <div className={classes.descWrap}>
              <p className={classes.desc}>{sheetDetailData?.description}</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
            <div className={classes.sheetData}>
             <div className={classes.share}>
             <FontAwesomeIcon className={classes.icon} icon={faShare} />
                    <span>{sheetDetailData?.shareCount}</span>
             </div>
             <div className={classes.comment}>
             <FontAwesomeIcon className={classes.icon} icon={faCommentDots} />
                    <span>{sheetDetailData?.commentCount}</span>
             </div>
             <div className={classes.subscribed}>
             <FontAwesomeIcon className={classes.icon} icon={faSquarePlus} />
                    <span>{sheetDetailData?.trackCount}</span>
             </div>
            </div>
          </div>
         
                <SongWrap count={sheetDetailData?.trackCount} trackIds={sheetDetailData?.trackIds}/>
          
        </div>
     
     

    </Fragment>
  
   
 
   

  );
}

export default SheetDetails;
