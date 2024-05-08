const { Application } = require( "./app/server")


if(process.env.PORT && process.env.DB_URL){
    new Application(process.env.PORT,process.env.DB_URL)
}

 