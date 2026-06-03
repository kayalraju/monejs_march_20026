const Employee = require("../models/employee");
class AggregateController {
  async createEmployee(req, res) {
    try {
      console.log(req.body);
      const { firstName, lastName, gender, email, salary, department } =
        req.body;
      if (
        !firstName ||
        !lastName ||
        !gender ||
        !email ||
        !salary ||
        !department
      ) {
        return res.status(400).json({
          success: false,
          message: "all fields are required",
        });
      }
      const empData = new Employee({
        firstName,
        lastName,
        gender,
        email,
        salary,
        department,
      });
      const result = await empData.save();
      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getEmployee(req, res) {
    try {
      const result = await Employee.find({});
      return res.status(201).json({
        success: true,
        message: "Employee fetched successfully",
        count: result.length,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async employeeList(req, res) {
    try {
        
      const result = await Employee.aggregate([
        //match
        // {
        //   $match: {
        //     salary: { $gt: 4000 },
        //     gender: "female",
        //   },
        // },

        //sort
        // {
        //   $sort: {
        //     salary: -1,
        //   },
        // },

        //project
        // {
        //   $project: {
        //     firstName: 0
        //   },
        // },

        //limit
        // {
        //   $limit: 5,
        // },

        //skip
        // {
        //   $skip: 5,
        // },

        //group
        // {
        //   $group: {
        //     _id: "$department",
        //     totalrmployee: { $sum: 1 },
        //     totalsalary: { $sum: "$salary" },
        //   },
        // },

        // {
        //   $group: {
        //     _id: "$department",
        //     count: { $sum: 1 },
        //     avgSalary: { $avg: "$salary" },
        //   },
        // },

        // { $match: { gender: "male" } },
        // {
        //   $group: {
        //     _id: "$department.name",
        //     totalEmployees: { $sum: 1 },
        //     totalSalary: { $sum: "$salary" },
        //   },
        // },

        // {
        //   $addFields: {
        //     totalSalary: { $add: ["$salary", 100] },
        //     company: "Google",
        //   },
        // },

        //sample

        // {
        //   $sample: {
        //     size: 5,
        //   },
        // },

        //unwind
        {
          $unwind: "$department",
        },
      ]);
      return res.status(201).json({
        success: true,
        message: "Employee fetched successfully",
        count: result.length,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AggregateController();
