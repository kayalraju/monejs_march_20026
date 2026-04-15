
const Student=require('../models/student')
const httpStatusCode = require('../utils/httpStatusCode')
const fs=require('fs')

class StudentController{
    async createStudent(req,res){
       // console.log(req.file);
        
        try{
            const {name,email,phone,city}=req.body

            if(!name || !email || !phone || !city){
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success:false,
                    message:"All fields are required"
                })
            }
          
            const Stu=await Student({
                name,
                email,
                phone,
                city
            })

            if(req.file){
                Stu.image=req.file.path
            }
            
            const result=await Stu.save()

            if(result){
                return res.status(httpStatusCode.CREATED).json({
                    success:true,
                    message:"Student created successfully",
                    data:result
                })
            }
            
        }catch(error){
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success:false,
                message:error.message
            })
        }
    }
    async getStudent(req,res){
        try{
          
          
            const data=await Student.find()
             return res.status(200).json({
                    success:true,
                    message:"Student get successfully",
                    total:data.length,
                    data:data
                })   
            
        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }


    async getStudentById(req,res){
        try{
            const id=req.params.id

            const data=await Student.findById(id)
             return res.status(200).json({
                    success:true,
                    message:"Student get successfully",
                    data:data
                })

        }catch(error){
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    async updateStudentById(req,res){
        try{
            const id=req.params.id
            const data=await Student.findByIdAndUpdate(id,req.body,{new:true})
            return res.status(200).json({
                success:true,
                message:"Student updated successfully",
            })

        }catch(error){
             return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    async deleteStudentBy(req,res){
        try{
            const id=req.params.id
            const data=await Student.findByIdAndDelete(id)
            return res.status(200).json({
                success:true,
                message:"Student deleted successfully",
            })

        }catch(error){
             return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}



module.exports=new StudentController()    