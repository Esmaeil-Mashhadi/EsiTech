const { Router } = require("express");
const { UserController } = require("./user.controller");
const {checkUserPermission} = require('../../guards/checkUserPermission')

const router = Router()

router.get("/permission", checkUserPermission , UserController.getUser)

module.exports ={
    UserRoutes : router
}