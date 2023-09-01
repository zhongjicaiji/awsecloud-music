import {useState,useEffect} from 'react'
import Title from '../../UI/Title/Title'
import { RL} from '../../../interface/responseInter'
import RankingItem from './RankingItem/RankingItem'
import classes from './RankingLIst.module.css'

import useAxios from '../../Hooks/useAxios'

function RankingList() {
  const [rankLists,setRankList]=useState<RL[]>([])
  const {data,loading,isSuccess,axiosRequire}=useAxios()
  useEffect(()=>{
      axiosRequire('/toplist/detail')
  },[])

  useEffect(()=>{
    isSuccess&&setRankList(data.list.slice(0,5))
  },[isSuccess])
  
  return (
    <div>
     <Title title='排行榜' type='parentsWrap' />
     <div className={classes.rankingWrap}>
    {isSuccess&&rankLists.map(item=><RankingItem  key={item.id} {...item} />)}
    
     </div>
    </div>
  )
}

export default RankingList