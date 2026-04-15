const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const StudentSchema= new Schema({
     name:{
          type:String,
          required:true
     },
     email:{
          type:String,
          required:true
     },
     phone:{
          type:String,
          required:true
     },
     city:{
          type:String,
          required:true
     },
     image:{
          type:String,
          required:false
     },
     isDeleted:{
          type:Boolean,
          default:false
     }
},
{
     timestamps:true,
     versionKey:false
})


const  StudentModel=mongoose.model('student',StudentSchema)

module.exports=StudentModel