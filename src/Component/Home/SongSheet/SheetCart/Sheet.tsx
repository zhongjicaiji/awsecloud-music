
import { sheetData } from '../../../../interface/responseInter'
import classes from "./Sheet.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
function Sheet({sheetDatas }:{sheetDatas:sheetData}) {
  const local=useLocation()
    let count:number=sheetDatas.playCount
    if(count>10000){
        count=Math.floor(count/1000)/10

    }
    const navToDetail=useNavigate()
    const clickHandler=()=>{
      navToDetail(`/songDetails/${sheetDatas.id}`,{
        state:local.pathname
      })
    }
  return (
    <div onClick={clickHandler} className={classes.wrap}>
        <div className={classes.cartMain}>
            <img  className={classes.img} src={sheetDatas.picUrl} alt="推荐歌单"  />
            <div  className={classes.histroyCount}>
            <FontAwesomeIcon icon={faPlay} />
            <span>{count}万</span>
            </div>
            <FontAwesomeIcon className={classes.player} icon={faPlay} />
         
        </div>
        <p className={classes.des}>{sheetDatas.name}</p>
    </div>
  )
}

export default Sheet