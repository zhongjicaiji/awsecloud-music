import {useState,useEffect} from 'react'
import Title from '../../UI/Title/Title'
import RankingItem from './RankingItem/RankingItem'
import classes from './RankingLIst.module.css'

import { useGetRankingListQuery } from '../../../store/Api/songApi'


function RankingList() {
  const {data:RankingListData,isSuccess:getRankingListSuccess}=useGetRankingListQuery(null)

  return (
    <div>
     <Title title='排行榜' type='parentsWrap' />
     <div className={classes.rankingWrap}>
    {getRankingListSuccess&&RankingListData.map(item=><RankingItem  key={item.id} {...item} />)}
    
     </div>
    </div>
  )
}

export default RankingList