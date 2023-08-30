import React from 'react'
import classes from "./Loading.module.css"

function Loading() {

  return (
    <div className={classes.wrap}>
        <div className={classes.line}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </div>
       <p className={classes.logo}>LOADING...</p>
       
    </div>
  )
}

export default Loading