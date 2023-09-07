import { LyricT,LyricArrT } from "../../interface/responseInter";
import baseApi from "./baseApi";


interface LyricDataT{
    timeArr:number[],
    lyricStr:string[]
}



const LyricApi=baseApi.injectEndpoints({
    endpoints(builder){
        return{
            getLyric:builder.query({
                query:(id:number)=>{
                 return `/lyric?id=${id}`
                },
                transformResponse:(res:LyricT):LyricDataT=>{
                    const timeArr:number[]=[]
                   const tmpStr=res.lrc.lyric.replaceAll(/\[\d+:\d+.\d+\]/g,function(val){
                    const time=parseInt(val.slice(1))*60*1000+parseFloat(val.slice(4,))*1000
                    timeArr.push(time)
                    return ''
                   })

                   const lyricStr=tmpStr.split('\n')

                    return {
                        timeArr,
                        lyricStr
                    } 

                },
  
            }),
   
        }    
    }
    
   
})
export const {
  useGetLyricQuery
}=LyricApi
export default LyricApi