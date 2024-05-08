import { configDotenv } from "dotenv"
import { NextFunction ,Response } from "express"
import createHttpError from "http-errors"
import { StatusCodes } from "http-status-codes"

const mongoose = require('mongoose')
const express =require('express')
const cors = require('cors')
const {AllRoutes} = require('../app/modules/router.ts')

configDotenv()

export class Application{
     app = express()
    constructor(public PORT:string , protected DB_URL:string){
        this.initServer()
        this.connectDB()
        this.appConfig()
        this.handlRoutes()
        this.errorHandler()
    }

    appConfig =()=>{
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cors({origin:"*"})) 
    }

    initServer = ()=>{
            this.app.listen(this.PORT , ()=>{
                console.log(`server ran on http://localhost:${this.PORT}`);
            })
            process.on('SIGINT' , ()=>{
                mongoose.connection.close()
                process.exit(1)
            })
        
    }

    handleRoutes = ()=>{
        this.app.use(AllRoutes)
    }


    connectDB = ()=>{
            mongoose.connect(this.DB_URL).then(()=>{
                console.log('connected to data base');
            }).catch((err:any)=>{
                console.log(err);
            })
    }

    handlRoutes = ()=>{
        this.app.use(AllRoutes)
    }


    errorHandler = ()=>{
        this.app.use((req:Request , res:Response , next:NextFunction)=>{
        throw createHttpError.NotFound("couldn't find the router")
        })

        this.app.use((err:any , req:Request, res:Response , next:NextFunction)=>{
            const status:number = err.status || StatusCodes.INTERNAL_SERVER_ERROR
            const message:string = err.message || createHttpError.InternalServerError()

            return res.status(status).json({
                data: {
                    status , message
                }
            })
        })
    }
}

