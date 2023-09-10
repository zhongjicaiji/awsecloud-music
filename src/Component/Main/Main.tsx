import React from 'react'
import HomePage from '../Home/HomePage'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import BottomBar from '../UI/BottomBar/BottomBar'

function Main() {
  return (
    <div>
        
       <Outlet/>
     <BottomBar/>
    </div>
  )
}

export default Main