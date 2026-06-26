require('dotenv').config()
const express=require('express')
const ejs=require('ejs')
const DBCon=require('./app/config/db')
const path=require('path')
const cors=require('cors')
const session=require('express-session')
const cookieParser=require('cookie-parser')
const morgan = require('morgan')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);
const logger=require('./app/utils/logger')


const app=express();

DBCon()

app.use(morgan('combined'))

app.use(cors())
//configure ejs
app.set('view engine','ejs')
app.set('views','views')


app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRECT || 'hellonode',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))
//static folder
app.use(express.static('public'))
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads')); 
//json define
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//define routes

const router=require('./app/routes') 
app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



const PORT=3006;

app.listen(PORT,()=>{
    logger.info(`server is running on port ${PORT}`)
})