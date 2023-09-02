import React from 'react'

const observer=new PerformanceObserver(list=>{

    for(const entries of list.getEntries()){
      console.log('长任务执行了')
      console.log(entries)
    }
  
   
  
  })
  observer.observe({type:'longtask',buffered:true})

export default observer