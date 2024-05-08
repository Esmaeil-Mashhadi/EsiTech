import { NextFunction , Response , Request} from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"
const { AuthService } = require("./Auth.service");

type ControllerFunction = (req:Request , res:Response , next:NextFunction) => void

class AuthController{
    SignUpHandler:ControllerFunction = async(req ,res ,next)=>{
        try {
           const {user ,accessToken} = await AuthService.signUpService(req)
           if(user){
              return res.status(StatusCodes.CREATED).json(
               { status: StatusCodes.CREATED , 
                   data:{
                       tokens:{ accessToken}
                   }
             })
           }
           throw createHttpError.InternalServerError('failed to create user')
       
        } catch (error) {
           next(error)
        }}


     loginHandler:ControllerFunction = async(req, res, next)=>{
            try {
               const {accessToken, refreshToken} = await AuthService.loginService(req)
               return res.status(StatusCodes.OK).json({
                  status:StatusCodes.OK , 
                  data: {
                     message:"welcome back",
                     tokens: {accessToken , refreshToken}
                  }
               })
            } catch (error) {
               next(error)
            }
          }

    optHandler:ControllerFunction = async(req ,res ,next)=>{
            try {
               const {code , tokens} = await AuthService.loginOtpService(req)
               if(code){
                  res.status(StatusCodes.OK).json({
                     status : StatusCodes.OK,
                     code
                  })
               }else if(tokens){
                  res.status(StatusCodes.OK).json({
                     status:StatusCodes.OK,
                     message:"welcome back",
                     tokens
                  })
               }
         
            } catch (error) {
               next(error)
            }
          }
    
    sendNewToken:ControllerFunction = async(req, res, next)=>{
            try {
               const {accessToken} =await AuthService.refreshTokenService(req)
               if(accessToken){
                  return res.status(StatusCodes.OK).json({
                     status: StatusCodes.OK,
                     data : {
                        accessToken,
                     }
                  })
               }
         
               throw createHttpError.InternalServerError("couldn't find the user")
         
            } catch (error) {
              next(error)
            }
           }
}



module.exports ={
    AuthController : new AuthController()
}