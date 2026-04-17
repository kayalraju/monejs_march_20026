const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const UserSchema= new Schema({
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
     password:{
          type:String,
          required:true
     },
     image:{
          type:String,
          default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_hybrid&w=740&q=80"
     },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},
{
     timestamps:true,
     versionKey:false
})


const  UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel