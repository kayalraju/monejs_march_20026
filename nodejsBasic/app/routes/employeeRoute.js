const express=require('express')
const validate = require('../middleware/EmployeeValidate')
const EmployeeSchemaValidation = require('../utils/employeevalidation')
const EmployeeController = require('../controller/EmployeeController')


const router=express.Router()



router.post('/create/employee',validate(EmployeeSchemaValidation),EmployeeController.createEmployee)





module.exports=router