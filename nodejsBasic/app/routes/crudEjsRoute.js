
const express = require('express')
const CrudEjsController = require('../controller/CrudEjsController')

const router = express.Router()




router.get('/show',CrudEjsController.show)
router.get('/add-student',CrudEjsController.create)
router.post('/store',CrudEjsController.store)
router.get('/edit/:id',CrudEjsController.Edit)
router.post('/update/:id',CrudEjsController.update)
router.get('/delete/:id',CrudEjsController.delete)

//soft delete
router.get('/soft/delete/:id',CrudEjsController.softdelete)

//trash data
router.get('/trash',CrudEjsController.trash)
router.get('/restore/:id',CrudEjsController.restore)

module.exports = router