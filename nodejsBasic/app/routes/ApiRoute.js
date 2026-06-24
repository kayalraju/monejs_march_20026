const express=require('express')
const StudentController = require('../controller/StudentController')
const StudentImage = require('../utils/fileUpload')

const router=express.Router()



//router.post('/create',StudentImage.single('image'),StudentController.createStudent)


/**
* @swagger
* /api/create:
*   post:
*     summary: create Student
*     tags:
*       - Student
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add student
 *        description: Add student in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - phone
 *            - city
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            city:
 *              type: string
 *     responses:
 *        201:
 *          description: student data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.post('/create',StudentController.createStudent)
/**
 * @swagger
 * /api/allstudent:
 *  get:
 *    summary: Get all the student from Database
 *    tags:
 *       - Student
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: data fetched successfully.
 */
router.get('/allstudent',StudentController.getStudent)
router.get('/student/edit/:id',StudentController.getStudentById)
router.put('/student/update/:id',StudentController.updateStudentById)
router.delete('/student/delete/:id',StudentController.deleteStudentBy)




module.exports=router