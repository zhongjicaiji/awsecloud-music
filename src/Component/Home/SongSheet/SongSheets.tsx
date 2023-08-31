import React,{useEffect,useState} from 'react'
import classes from './SongSheet.module.css'
import { sheetData } from '../../../interface/responseInter'
import { sheetT } from '../../../interface/propsInterface'

import Sheet from './SheetCart/Sheet'
import Loading from '../../UI/Loading/Loading'
import Title from '../../UI/Title/Title'
import useAxios from '../../Hooks/useAxios'



function SongSheet(props:sheetT) {
    const [songSheetData,setSongSheetData]=useState<sheetData[]>([])
    const {data,loading,axiosRequire}=useAxios()

    useEffect(()=>{
       axiosRequire(props.url)
    },[])
    useEffect(()=>{
    
    loading&& setSongSheetData(data.result)
    },[loading])

  return (
    <div className={classes.wrap} >
      <Title title='好歌推荐' type='parentsWrap' />
        <div className= {`${classes.sheetWrap} ${loading?classes.sheetLoading:''}`}>
          {loading&&songSheetData.map(item=> <Sheet  key={item.id}  sheetDatas={{...item}} />)}
       
        </div>
    </div>
  )
}

export default SongSheet