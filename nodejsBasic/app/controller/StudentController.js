
const Student=require('../models/student')

class StudentController{
    async createStudent(req,res){
        try{
            const {name,email,phone,city}=req.body

            if(!name || !email || !phone || !city){
                return res.status(400).json({
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
            
            const result=await Stu.save()

            if(result){
                return res.status(201).json({
                    success:true,
                    message:"Student created successfully",
                    data:result
                })
            }
            
        }catch(error){
            return res.status(500).json({
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
}



module.exports=new StudentController()    