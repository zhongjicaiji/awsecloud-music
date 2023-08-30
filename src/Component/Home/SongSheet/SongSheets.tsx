import React,{useEffect,useCallback,useState} from 'react'
import classes from './SongSheet.module.css'
import { getSongSheet } from '../../../store/Api/SongSheet'
import { sheetData } from '../../../interface/responseInter'
import { sheetT } from '../../../interface/propsInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Sheet from './SheetCart/Sheet'
import Loading from '../../UI/Loading/Loading'



function SongSheet(props:sheetT) {
    const [songSheetData,setSongSheetData]=useState<sheetData[]>([])
    const [loading,setLoading]=useState<boolean>(true)

    useEffect(()=>{
        getSongSheet(props.url).then(res=>{
          if(res){
            setSongSheetData(res.result)
            setLoading(false)
          }
        
          })
    },[])

  return (
    <div className={classes.wrap} >
        <div className={classes.header}>
        <h1 className={classes.title}>好歌推荐</h1>
        <FontAwesomeIcon className={classes.angleRight} icon={faAngleRight} />
        </div>
        <div className= {`${classes.sheetWrap} ${loading?classes.sheetLoading:''}`}>
          {!loading&&songSheetData.map(item=> <Sheet  key={item.id}  sheetDatas={{...item}} />)}
          {loading&&<Loading/>}
        </div>


    </div>
  )
}

export default SongSheet