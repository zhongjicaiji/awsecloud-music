import React,{useEffect,useState} from 'react'
import classes from './SongSheet.module.css'
import { sheetT } from '../../../interface/propsInterface'
import Sheet from './SheetCart/Sheet'

import Title from '../../UI/Title/Title'
import { useGetSongSheetQuery } from '../../../store/Api/songApi'




function SongSheet(props:sheetT) {

    const {data:sheetData,isSuccess:getSheetDataSuccess}=useGetSongSheetQuery(props.url)
  return (
    <div className={classes.wrap} >
      <Title title='好歌推荐' type='parentsWrap' />
        <div className= {`${classes.sheetWrap} `}>
          {getSheetDataSuccess&&sheetData.map(item=> <Sheet  key={item.id}  sheetDatas={{...item}} />)}
       
        </div>
    </div>
  )
}

export default SongSheet