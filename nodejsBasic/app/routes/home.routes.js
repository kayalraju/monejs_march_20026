

const express=require('express')
const homeController = require('../controller/home.controller')
const router=express.Router()


router.get('/',homeController.Home)
router.get('/about',homeController.about)





module.exports=router