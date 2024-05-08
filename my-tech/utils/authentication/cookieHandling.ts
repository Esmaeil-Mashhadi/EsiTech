import api from "@/configs/axios.config"

 const saveCookie = (accessToken:string , refreshToken?:string)=>{
   document.cookie = `accessToken=${accessToken};max-age=${60*60*24}`
   if(refreshToken) document.cookie = `refreshToken=${refreshToken}; SameSite=Lax; max-age=${60*60*24*90}`
}

const getClientCookie = ()=>{
   const clientCookie:Record<string ,string> = {}
   
      document.cookie.split(";").forEach(item =>{
         const cookieSplit = item.split('=')
         clientCookie[cookieSplit[0].trim()] = cookieSplit[1]
         
      })
   
   return clientCookie
}


const getNewToken = async()=>{
   const {refreshToken} = getClientCookie()
  const res= await api.post('/auth/newToken' , {refreshToken})
   return res
}



export {
   saveCookie , getClientCookie  , getNewToken
}