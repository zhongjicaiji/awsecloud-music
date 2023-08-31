import { useState,useCallback } from "react"
import axiosInstance from "../../store/Api/apiConfig"


export default function  useAxios(){
    const [data,setData]=useState<any>()
    const [loading,setLoading]=useState<boolean>(false)
   
    const axiosRequire=useCallback(async (url:string)=>{
        axiosInstance.get(url).then(res=>{
            if(res){
                setData(res.data)
                setLoading(true)
            } 
        }).catch(reject=>{
            console.log(reject)
        })
    },[])
        return{
            data,
            loading,
            axiosRequire
        }
            

}