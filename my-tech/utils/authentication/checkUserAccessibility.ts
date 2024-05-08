import api from "@/configs/axios.config";
import { AxiosRequestHeaders } from "axios";

export type tokenType = { value :string } | string | undefined

export const checkUserAccessibility = async (token:tokenType) => {
    if(token){
        let accessToken = typeof token === 'string'? token : token.value 
        api.interceptors.request.use((req:AxiosRequestHeaders)=>{
            req.headers.Authorization = `bearer ${accessToken}`
            return req
        })
          const result = await api.get("/profile/permission" );
          return result?.data
    }else {
        return null
    }
  };