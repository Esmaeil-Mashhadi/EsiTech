import { Router } from "express";
const { AuthController } = require("./AuthController");

const router = Router()

router.post("/register"  , AuthController.SignUpHandler)
router.post("/login" , AuthController.loginHandler)
router.post("/OTP" , AuthController.optHandler)
router.post('/newToken'  , AuthController.sendNewToken)


module.exports = {
    AuthRoutes : router
}