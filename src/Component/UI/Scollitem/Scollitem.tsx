import React, { useEffect, useRef, useState } from 'react'
import classes from './ScrollItem.module.css'



function ScrollItem(props:any) {

    
  const [loading,setLoading]=useState<boolean>(true)

  const cartRef=useRef(null)

  useEffect(()=>{
    const observer=new IntersectionObserver((entries,observer)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            setLoading(false)
           observer.unobserve(entry.target);
          }
        })
    })
   
      observer.observe(cartRef.current as unknown as Element) 
    
      return ()=>{
        observer.disconnect()
      }
  })
  return (
    <div  ref={cartRef} >
        {loading?
        <div className={classes.wrap}>Loading..... </div>
        : props.children}
    </div>
  )
}

export default ScrollItem