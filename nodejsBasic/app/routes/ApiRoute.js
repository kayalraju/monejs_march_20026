const express=require('express')
const StudentController = require('../controller/StudentController')
const StudentImage = require('../utils/fileUpload')

const router=express.Router()



router.post('/create',StudentImage.single('image'),StudentController.createStudent)
router.get('/allstudent',StudentController.getStudent)
router.get('/student/edit/:id',StudentController.getStudentById)
router.put('/student/update/:id',StudentController.updateStudentById)
router.delete('/student/delete/:id',StudentController.deleteStudentBy)




module.exports=router