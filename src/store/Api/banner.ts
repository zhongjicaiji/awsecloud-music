
import axiosInstance from "./apiConfig";

type bannerData=()=>Promise<any>
export const getBannerData:bannerData=async ()=>{
    try{
        const bannerData=await axiosInstance.get('/banner')
        if(bannerData.status>400){
            throw new Error('轮播图加载失败')
        }
        return bannerData.data.banners
    }catch(err){
        console.log(err)
        return err
    }     
}