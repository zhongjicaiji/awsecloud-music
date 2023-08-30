import axiosInstance from "./apiConfig";
import { SongSheetRes } from "../../interface/ApiInterface";

export const getSongSheet:SongSheetRes=async (url:string)=>{
        try{
            const response=await axiosInstance.get(url)
           if(response.status>400){
            throw new Error('获取歌单失败')
           }
          return response.data
        }catch(err){
            console.log(err)
        }
}