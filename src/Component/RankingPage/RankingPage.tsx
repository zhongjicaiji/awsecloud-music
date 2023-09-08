
import TopMange from '../UI/TopMange/TopMange'
import {  useParams } from 'react-router-dom'

import classes from './RankingPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare,faCommentDots ,faSquarePlus} from '@fortawesome/free-solid-svg-icons'
import {useGetSheetInfoQuery} from '../../store/Api/songApi'
import SongWrap from '../SongWrap/SongWrap'
import { useCallback } from 'react'


function RankingPage() {

    const param=useParams()
   

    const {data:sheetDetailData,isSuccess:getSheetDetailSuccess}=useGetSheetInfoQuery(Number(param.id))
 
    const formatData=useCallback((count:number):string|number=>{
        let playCount:string|number=count
        if(count>10000) playCount=Math.ceil(playCount/10000)+'万'
        else if(count>10**8) playCount=Math.ceil(playCount/(10**8))+"亿"
        return playCount
    },[param])
    let shareCount:string|number='0'
    let commentCount:string|number='0'
    let subscribedCount:string|number='0'
    if(getSheetDetailSuccess){
        shareCount=formatData(sheetDetailData.shareCount)
        commentCount=formatData(sheetDetailData.commentCount)
        subscribedCount=formatData(sheetDetailData.subscribedCount)

    }

  return (
    <div className={classes.wrap}>
        <TopMange title={sheetDetailData?.name}/>
        
        <div style={{backgroundImage:`url(${sheetDetailData?.coverImgUrl})`}}  className={classes.header} >
            <div className={classes.rankingData}>
            <button className={classes.share}>
             <FontAwesomeIcon className={classes.icon} icon={faShare} />
                    <span>{shareCount}</span>
             </button>
             <button className={classes.comment}>
             <FontAwesomeIcon className={classes.icon} icon={faCommentDots} />
                  <span>{commentCount}</span>
             </button>
             <button className={classes.subscribed}>
             <FontAwesomeIcon className={classes.icon} icon={faSquarePlus} />
                    <span>{subscribedCount}</span>
             </button>
                
            </div>
        </div>
        <div className={classes.body}>
           {getSheetDetailSuccess&&<SongWrap type='ranking' trackIds={sheetDetailData.trackIds} count={sheetDetailData.trackIds.length} />} 
        </div>
       
      
    </div>
  )
}

export default RankingPage