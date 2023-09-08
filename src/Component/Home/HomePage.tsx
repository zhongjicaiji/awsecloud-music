import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import classes from "./HomePage.module.css";
import Banner from "./Banner/Banner";
import SongSheet from "./SongSheet/SongSheets";
import RankingList from "./RankingLists/RankingList";
import Drawer from "../Drawer/Drawer";
import Backdrop from "../UI/Backdrop/Backdrop";
function HomePage() {
  const [showDrawer,setShowDrawer]=useState<boolean>(false)
  const showDrawerHandler=()=>{
    setShowDrawer(true)
  }
  const closeDrawerHandler=()=>{
    setShowDrawer(false)
  }


  return (
  
        <div className={classes.homeWrap}>
      <div className={`${classes.Drawer} ${showDrawer?classes.showDrawer:classes.closeDrawer}`}>
      
       <Drawer close={closeDrawerHandler} />
     

      </div>
     {showDrawer&& <Backdrop />} 
     
      <div className={classes.topSearch}>
        <FontAwesomeIcon onClick={showDrawerHandler} className={classes.bar} icon={faBars} />
        <SearchBar />
        <FontAwesomeIcon className={classes.Micro} icon={faMicrophone} />
     </div>
      <div className={classes.homeBody}>
        <div className={classes.banner}>
          <Banner />
        </div>
        <div>
          <SongSheet url="/personalized?limit=10" />
        </div>
        <RankingList />
      </div>
    </div>


  
  );
}

export default HomePage;
