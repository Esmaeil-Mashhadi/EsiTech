import { NextFunction, Request, Response } from "express"

const createHttpError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

class UserController {
  getUser = async(req:Request, res:Response ,next:NextFunction)=>{
    try {
        const user = req.body.user
        if(user){
            return res.status(StatusCodes.OK).json({
                status:StatusCodes.OK ,
                email :user.email,
                mobile:user?.mobile,
            })
        }else{
            throw createHttpError.NotFound("couldn't find the user")
   
        }
        
    } catch (error) {
        next(error)
    }
  }
}

module.exports = {
    UserController : new UserController()
}