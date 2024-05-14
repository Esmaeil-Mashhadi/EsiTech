
import { Request, Response } from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
const { userModel } = require('../user/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationForm, otpValidation} = require('../../../validation/handleSignUpValidation') 



type payloadType = {
    email?:string , 
    mobile?:string
}


class AuthService {
    tokenCreator = (payload:payloadType , remember?:boolean)=>{
        const secret = process.env.JWTSECRET
        let refreshToken =null
        const accessToken = jwt.sign({payload} , secret , {expiresIn:'1d'})
        if(remember){
            refreshToken = jwt.sign({payload}, secret , {expiresIn:'90d'})
        }
        return {accessToken , refreshToken}
      }
    
   randomDigitGenerator = ()=>{
    const number = (Math.random()*90000) + 10000
    return Math.floor(number)
   }
    
      signUpService = async(req:Request)=>{
          const {email, mobile ,password} = await validationForm.validateAsync(req.body)
          const checkUserExistence = await userModel.findOne({
           $or: [{ mobile }, { email }]
         });
          if(checkUserExistence) throw createHttpError.BadRequest('user already exist')
          const hashedPassword = bcrypt.hashSync(password, 10)
          const {accessToken}= this.tokenCreator(email)
          const user = await userModel.create({email , mobile , password: hashedPassword })
          return {user , accessToken}
     }

     loginService = async(req:Request)=>{
        const {info , password , remember} = req.body
        if(!info && !password) throw createHttpError.BadRequest('please fill all the inputes')
        const user = await userModel.findOne({$or:[{email:info} , {mobile:info}]})
        if(!user) throw createHttpError.NotFound("user doesn't exist , please sign up first")
        const validatePassword = bcrypt.compareSync(password , user.password)
        if(!validatePassword) throw createHttpError.Forbidden('information or password is incorrect')
        return this.tokenCreator(info , remember)
     }

     loginOtpService = async(req:Request)=>{
        const {mobile ,code , remember} = req.body
        await otpValidation.validateAsync({mobile , code: code+"" , remember})
        if(code){
           const user = await userModel.findOne({code})
           if(!user) throw createHttpError.Forbidden("code or mobile is not correct")
           const payload = user?.email || user?.mobile
           const tokens = this.tokenCreator(payload, remember)
           return {tokens}
        }
        if(mobile){
           const code = this.randomDigitGenerator()
           const user = await userModel.updateOne({mobile} , {$set:{code}})
           if(user.modifiedCount){
              return {code}
           }else{
              throw createHttpError.NotFound("mobile doesn't exist , register first")
           }
             
           
        }
     }


     refreshTokenService = async(res:Response , req:Request)=>{
      const {refreshToken} = req.body
      const {payload , exp} = jwt.verify(refreshToken , process.env.JWTSECRET, {ignoreExpiration:true})
      const  user = await userModel.findOne({$or:[{email:payload} , {mobile:payload}]})
      if(!user || exp*1000 < Date.now()){
       return res.status(StatusCodes.UNAUTHORIZED).json({
          status:StatusCodes.UNAUTHORIZED ,
          message:"please Login to your account"
       })
      }
            const accessToken = jwt.sign({payload} , process.env.JWTSECRET ,{expiresIn:'1d'})
            return {accessToken}
    }
   
     
}

module.exports ={
    AuthService : new AuthService()
 }