
const express=require('express')

const router=express.Router()
const ApiRoutes=require('./ApiRoute')
const crudejsRoutes=require('./crudEjsRoute')
const Authroutes=require('./authroute')
const homeRoutes=require('./home.routes')
const authEjsRoutes=require('./authEjsRoute')
const aggregateRoute=require('./AggregateRoute');
const employeeRoute=require('./employeeRoute')

//this route is for api
router.use('/api',ApiRoutes)
router.use('/v1/auth',Authroutes)




// this route for ejs
router.use(authEjsRoutes)
router.use(homeRoutes)
router.use(crudejsRoutes)   
router.use(aggregateRoute)
router.use('/api',employeeRoute)



module.exports=router