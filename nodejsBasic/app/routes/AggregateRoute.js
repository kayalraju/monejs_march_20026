
const express=require('express')
const router=express.Router();
const AggregateController=require('../controller/AggregationController');
const lookupcontroller = require('../controller/lookupcontroller');

router.post('/aggregate',AggregateController.createEmployee);
router.get('/aggregate/find',AggregateController.getEmployee);
router.get('/aggregate',AggregateController.employeeList);

//lookup


router.post("/create/category",lookupcontroller.createCategory);
router.get("/category",lookupcontroller.getCategory);
router.post("/create/subcategory",lookupcontroller.createsubCategory);
router.get("/subcategory",lookupcontroller.subCategory);
module.exports=router