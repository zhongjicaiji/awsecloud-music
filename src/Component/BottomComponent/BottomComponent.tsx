import React, { useState,useEffect,memo } from 'react'
import AudioPlayer from '../newPlayControl/AudioPlayer'
import BottomBar from '../UI/BottomBar/BottomBar'
import { useLocation } from 'react-router-dom'
import classes from './BottomCom.module.css'
import { useSelector } from 'react-redux'


function BottomComponent() {

    
  return (
    <div className={classes.AudioPlayerStyle}>
    <AudioPlayer />

    </div>
  )
}

export default memo (BottomComponent)