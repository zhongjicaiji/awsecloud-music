import{useState,useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useAxios from '../Hooks/useAxios'
import { sheetDetailT } from '../../interface/responseInter'
interface paramT{
    id?:string,
}

function SongDetails() {
    const [songDetails,setSongDetail]=useState<sheetDetailT[]>()
    const { data, loading, axiosRequire } = useAxios();
    const param:paramT=useParams()
    const local=useLocation()
    console.log(songDetails)


    useEffect(()=>{
        axiosRequire(`/playlist/detail?id=${param.id}`)
        
    },[])

 
    
  return (
    <div>SongDetails</div>
  )
}

export default SongDetails