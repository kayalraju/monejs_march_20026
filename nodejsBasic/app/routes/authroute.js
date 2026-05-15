const express=require('express')
const AuthController = require('../controller/AuthController')
const AuthCheck = require('../middleware/auth')
const adminAuthController = require('../controller/adminAuthController')
const AdminAuthCheck = require('../middleware/adminAuthCheck')


const router=express.Router()



router.post('/register',AuthController.register)
router.post('/verify',AuthController.verify)
router.post('/login',AuthController.login)
router.get('/dashboard',AuthCheck,AuthController.dashboard)


//admin auth

router.post('/admin/login',adminAuthController.adminLogin)
router.get('/admin/dashboard',AdminAuthCheck,adminAuthController.adminDashboard)

module.exports=router