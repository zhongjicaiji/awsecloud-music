import { useState,useCallback } from "react"
import axiosInstance from "../../store/Api/apiConfig"


export default function  useAxios(){
    const [data,setData]=useState<any>()
    const [loading,setLoading]=useState<boolean>(false)
    const [isSuccess,setIsSuccess]=useState<boolean>(false)
   
    const axiosRequire=useCallback(async (url:string)=>{
        axiosInstance.get(url).then(res=>{
            if(res){
                setData(res.data)
                setIsSuccess(true)
              
            
            } 
        }).catch(reject=>{
    
            console.log(reject)
            setIsSuccess(false)
        })
        .finally(()=>{
            setLoading(true)
        })
    },[])
        return{
            data,
            isSuccess,
            loading,
            axiosRequire
        }
}