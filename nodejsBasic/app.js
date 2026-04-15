require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const DBCon=require('./app/config/db')
const path=require('path')


const app=express();

DBCon()

//configure ejs
app.set('view engine','ejs')
app.set('views','views')

//static folder
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 
//json define
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//define routes
const homeRoutes=require('./app/routes/home.routes')
app.use(homeRoutes)  

const ApiRoutes=require('./app/routes/ApiRoute')
app.use('/api',ApiRoutes)

const crudEjsRoutes=require('./app/routes/crudEjsRoute')
app.use(crudEjsRoutes)


const PORT=3006;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})