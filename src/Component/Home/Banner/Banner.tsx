import React, { useEffect, useState } from "react";
import axiosInstance from "../../../store/Api/apiConfig";

function Banner() {
  const [banners,setBanners]=useState<any[]>([])

  const getBannerData= async () => {
    try {
      const bannerData = await axiosInstance.get("/banner");
      if (bannerData.status > 400) {
        throw new Error("轮播图加载失败");
      }
    
      return bannerData.data.banners;
    } catch (err) {
      console.log(err);
   
    }
  };

  useEffect(()=>{
    const data=getBannerData()
  data.then(res=>{
    console.log(res)
    setBanners(res)
   })
   
  },[])


  return <div>
    {banners.length&&banners.map(item=><img key={item.imageUrl} src={item.imageUrl}  title="轮播图"/>)}
  </div>;
}

export default Banner;
