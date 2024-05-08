import { NextFunction, Request, Response } from "express"

const jwt = require('jsonwebtoken')
const { userModel } = require('../modules/user/userModel')
const createHttpError = require('http-errors')



const checkUserPermission = async(req:Request , res:Response ,next:NextFunction)=>{
    try {

        const accessToken = (req.headers.authorization)?.split(" ")[1]|| null

        if(!accessToken) throw createHttpError.NotFound("token doesn't exist")

         const {payload , exp} = jwt.verify(accessToken, process.env.JWTSECRET, {ignoreExpiration:true}) 
            if(payload){
                if(Date.now() > exp*1000) throw createHttpError.Unauthorized("token has expired")
                const user = await userModel.findOne({$or:[{email:payload} , {mobile:payload}]}, {password:0 , _id:0 ,__v:0})
                if(user){
                    req.body.user = user 
                    next()  
                }
            }
        
    } catch (error) {
        next(error)
    }
 }

 module.exports ={
    checkUserPermission
 } 