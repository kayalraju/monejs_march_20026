
const Employee=require('../models/employeemodel')


class EmployeeController{

    async createEmployee(req,res){

        try{

            const empData=new Employee(req.body)
            const result=await empData.save()
            return res.status(201).json({
                success:true,
                message:"Employee created successfully",
                data:result
            })

        }catch(error){
            console.log(error.message);
        }
    }
}




module.exports=new EmployeeController()