require('dotenv').config()
const mongoose=require('mongoose');


const DbCon=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://raktimb414_db_user:0DFxcqgkR2HG61Z1@cluster0.kpdd2bf.mongodb.net/crud-app')
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}


module.exports=DbCon