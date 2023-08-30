import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars ,faMicrophone } from '@fortawesome/free-solid-svg-icons'
import classes from "./HomePage.module.css"
import Banner from './Banner/Banner'
import SongSheet from './SongSheet/SongSheets'
function HomePage() {
  return (
    <div >
      <div className={classes.topSearch}>
        <FontAwesomeIcon className={classes.bar}  icon={faBars}/>
        <SearchBar/>
        <FontAwesomeIcon className={classes.Micro} icon={faMicrophone} />
      </div>
      <div>
      <div className={classes.banner}>
      <Banner/>
      </div>
      <div>
        <SongSheet url="/personalized?limit=10"/>
      </div>
      </div>
     
    
    </div>
  )
}

export default HomePage