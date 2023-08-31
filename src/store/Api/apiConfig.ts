import axios from "axios";


const BASEURL="https://service-an89ks1a-1320556576.gz.apigw.tencentcs.com/release"

const axiosInstance=axios.create({
    baseURL:BASEURL,
    
})

axiosInstance.interceptors.response.use(
    res=>res,
    err=>{
        throw new Error('拦截器响应'+err)
    }
)
export default axiosInstance;

