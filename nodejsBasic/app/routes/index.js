
const express=require('express')

const router=express.Router()
const ApiRoutes=require('./ApiRoute')
const crudejsRoutes=require('./crudEjsRoute')
const Authroutes=require('./authroute')
const homeRoutes=require('./home.routes')

//this route is for api
router.use('/api',ApiRoutes)
router.use('/v1/auth',Authroutes)




// this route for ejs
router.use(homeRoutes)
router.use(crudejsRoutes)   



module.exports=router