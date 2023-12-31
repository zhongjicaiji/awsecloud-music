import {createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseApi=createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:"https://service-an89ks1a-1320556576.gz.apigw.tencentcs.com/release",
    }),
    reducerPath:"baseApi",
    endpoints:()=>({}),
    keepUnusedDataFor:5*60,
    
    refetchOnMountOrArgChange:60

})

export default baseApi