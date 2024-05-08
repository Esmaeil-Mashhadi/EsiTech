const { default: mongoose, models, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type :String },
    mobile:{type :String },
    password:{type :String },
    name:{type:String},
    googleJWT :{type:String},
    code :{type:Number},
    role: {type:String , default:"user"}
},{virtuals:true})


module.exports ={
    userModel : mongoose.model('user' , userSchema)
}