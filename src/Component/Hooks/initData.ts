import React, { useCallback } from 'react'
import { initSongHandler } from '../../store/reducer/PlaySongSlice'

import { useDispatch,useSelector } from 'react-redux'
import { SongT,SongList } from '../../interface/responseInter'


const useInitSong=()=>{
    const newData:SongList=useSelector((state:any)=>state.SongListSlice)
    const dispatch=useDispatch()

    const initData=useCallback((data:SongT)=>{
        dispatch(initSongHandler({
            id:data.id,
            playState:true,
            name:data.name,
            dTime:data.dt,
            picUrl:data.al.picUrl,
            fee:data.fee,
            artistName:data.ar[0].name,
        }))
    },[newData.currentSongId])
  
   return initData
    
}


export default useInitSong