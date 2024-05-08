const Joi = require("joi");

const validationForm = Joi.object({
    email:Joi.string().required().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).error(new Error('Email is not valid')),
    password: Joi.string().required().min(6).max(25).error( new Error('password must be between 6 to 25 character')),
    confirm: Joi.string().required().valid(Joi.ref('password')).error(new Error("passwords and confirmation doesn't match")),
    check : Joi.boolean().required().valid(true).error(new Error("terms and condition are not accepted")),
    mobile:Joi.string().pattern(/^(\+98|0|0098|1|001|91|001|44|0044)\d{9,15}$/).error(new Error('mobile phone is not valid'))

})

const otpValidation = Joi.object({
    mobile:Joi.string().pattern(/^(\+98|0|0098|1|001|91|001|44|0044)\d{9,15}$/).error(new Error('mobile phone is not valid')),
    code: Joi.string().min(3).max(6).allow(""),
    remember:Joi.boolean()
})

module.exports ={
    validationForm , otpValidation
}