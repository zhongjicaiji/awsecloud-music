import axios from "axios";


const BASEURL="https://first-demo-cloud-music.vercel.app"

const axiosInstance=axios.create({
    baseURL:BASEURL,
    timeout:3000
})

axiosInstance.interceptors.response.use(
    res=>res,
    err=>{
        throw new Error('拦截器响应'+err)
    }
)
export default axiosInstance;

