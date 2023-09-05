import baseApi from "./baseAPI";

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
                
            })
        }
    }
})

export const {useGetBannerQuery}=bannerApi
export default bannerApi