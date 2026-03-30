const express=require('express')
const StudentController = require('../controller/StudentController')

const router=express.Router()



router.post('/create',StudentController.createStudent)
router.get('/allstudent',StudentController.getStudent)




module.exports=router