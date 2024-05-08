import { getNewToken, saveCookie } from "@/utils/authentication/cookieHandling";
import { AxiosError, AxiosResponse } from 'axios';


const { default: axios } = require("axios");

const api = axios.create({
    baseURL:"http://localhost:4000" , 
    headers:{'Content-Type' :"application/json"},
})

interface CustomAxiosErrorType{
    _retry?:boolean
}

api.interceptors.response.use((response:AxiosResponse)=>{
  return response
} ,
async(err:AxiosError)=>{
    const orignialRequest = err.config as CustomAxiosErrorType
    if(err.response?.status == 401  && !orignialRequest?._retry){
        orignialRequest._retry = true
        const res =  await getNewToken()
        if(!res)  return Promise.reject(err)
        const accessToken = res.data.data.accessToken
        saveCookie(accessToken)
        document.location.reload() // this relaod is because new token doesn't immedatily be set if retresh doesn't happen
    }else{
        return Promise.reject(err)
    }
})
export default api