
import axiosInstance from "./apiConfig";
import { ApiResType } from "../../interface/ApiInterface";
//轮播图

export const getBannerData:ApiResType= async () => {
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
