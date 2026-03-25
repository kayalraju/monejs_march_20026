
const express=require('express')
const ejs=require('ejs')


const app=express();


//configure ejs
app.set('view engine','ejs')
app.set('views','views')




//define routes
const homeRoutes=require('./app/routes/home.routes')
app.use(homeRoutes)  


const PORT=3006;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})