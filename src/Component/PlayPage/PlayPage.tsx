import React from 'react'
import classes from './PlayPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons'

function PlayPage() {
   

  return (
    <div>
        <div className={classes.header}>
        <FontAwesomeIcon  className={`${classes.icon}`} icon={faArrowLeft} />
         <div className={classes.songName}>雪distance</div>
         <FontAwesomeIcon icon={faShareNodes} />
         
        </div>
    </div>
  )
}

export default PlayPage