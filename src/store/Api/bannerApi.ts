//@ts-ignore
import baseApi from "./baseApi";

const bannerApi=baseApi.injectEndpoints({
    endpoints:(builder)=>{
        return{
            getBanner:builder.query({
                query:()=>{

                    return '/banner'
                },
                transformResponse:(response:{banners:any[]})=> {
                    return response.banners.slice(0,4)
                },
                keepUnusedDataFor:60*30
                
            })
        }
    }
})

export const {useGetBannerQuery}=bannerApi
export default bannerApi