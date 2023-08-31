import{useState,useEffect}from 'react'
import { RL } from '../../../../interface/responseInter'
import classes from './RankingItem.module.css'
import Title from '../../../UI/Title/Title';

import SongItem from './Song/SongItem';
import { song } from '../../../../interface/propsInterface';

import useAxios from '../../../Hooks/useAxios';

function RankingItem(props:RL) {
    const [songDatas,setSongDatas]=useState<song[]>([])
    const {data,loading,axiosRequire}=useAxios()
  
    useEffect(()=>{
        axiosRequire(`/playlist/track/all?id=${props.id}&limit=3&offset=1`)
      
    },[])
    useEffect(()=>{
     loading&&setSongDatas(data.songs)
    },[loading])
   
  return (
    <div className={classes.wrap}>
        <div>
        <Title title={props.name} type='childrenWrap' desc='深夜emo' />
        </div>
        <div>
            {loading&&songDatas.map((item,index)=><SongItem key={item.id} id={item.id} name={item.name} no={index+1} artist={item.ar} />)}
          
        </div>

        
    
    </div>
  )
}

export default RankingItem