import { LyricT,LyricArrT } from "../../interface/responseInter";
import baseApi from "./baseApi";


interface LyricDataT{
    timeArr:number[],
    lyricStr:string[]
}
interface T{
    time:number,
    lyc:string
}


const LyricApi=baseApi.injectEndpoints({
    endpoints(builder){
        return{
            getLyric:builder.query({
                query:(id:number)=>{
                 return `/lyric?id=${id}`
                },
                transformResponse:(res:LyricT):T[]=>{
                    let ans:T[]=[]
                    let lyric=res.lrc.lyric.split(/[\n]/).forEach(item=>{
                        
                        let tmp=item.split(/\[(.+?)\]/)
                       if(tmp.length>2){
 
                        let tmpTime=parseInt(tmp[1].slice(0))*60+parseFloat(tmp[1].slice(3))
                   
                      
                        ans.push({
                            time:tmpTime,
                            lyc:tmp[2]
                        })
                       }
                      
                    })
                   ans=ans.filter(item=>item.lyc)
                    return  ans

                },
  
            }),
   
        }    
    }
    
   
})
export const {
  useGetLyricQuery
}=LyricApi
export default LyricApi