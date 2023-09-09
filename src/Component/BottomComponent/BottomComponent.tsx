import React, { useState,useEffect,memo } from 'react'
import AudioPlayer from '../newPlayControl/AudioPlayer'
import BottomBar from '../UI/BottomBar/BottomBar'
import { useLocation } from 'react-router-dom'
import classes from './BottomCom.module.css'

function BottomComponent() {
    const [showBottomBar,setShowBottomBar]=useState(true)
    const local=useLocation()
    useEffect(()=>{
        if(local.pathname==='/' ){
            setShowBottomBar(true)
          }else{
            setShowBottomBar(false)
          }
    },[local.pathname])
    
  return (
    <div className={classes.AudioPlayerStyle}>
    <AudioPlayer />
        { showBottomBar&&<BottomBar/>}
    </div>
  )
}

export default memo (BottomComponent)