import { Router, Request, Response, NextFunction } from "express";
const {AuthRoutes} = require('../modules/auth/auth.routes')
const {UserRoutes} = require('../modules/user/user.routes')
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('hey this is myTech Backend');
});

router.use('/auth' , AuthRoutes)
router.use('/profile' , UserRoutes)
module.exports ={
    AllRoutes:router
}