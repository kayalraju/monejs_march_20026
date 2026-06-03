const Category = require("../models/category");
const SubCategory = require("../models/subcategory");

class LookupController {
  async createCategory(req, res) {
    try {
      const data = await Category.create(req.body);
      return res.status(200).json({
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCategory(req, res) {
    try {
      const data = await Category.find();
      return res.status(200).json({
        message: "Category get successfully",
        data: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async createsubCategory(req, res) {
    try {
      const { subCategoryName, categoryId } = req.body;
      const data = new SubCategory({
        subCategoryName,
        categoryId,
      });
      await data.save();
      return res.status(200).json({
        message: "subCategory created successfully",
        data: data,
      });
    } catch (error) {
      logger.error(error);
    }
  }

  async subCategory(req, res) {
    try {
      const data = await SubCategory.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },

        {
            $lookup:{
                from:"products",
                localField:"_id",
                foreignField:"subCategoryId",
                as:"product"
            }
        },
        // {
        //   $unwind: "$category",
        // }

        // {
        //     $project: {
        //       subCategoryName: 1,
        //       categoryName: "$category.categoryName",
        //     },
        // }
        // {
        //     $group:{
        //         _id:"$subCategoryName",
        //         subCategoryName:{$first:"$subCategoryName"},
        //         categoryName:{$first:"$category.categoryName"},
        //     }
        // }

        {
          $group: {
            _id: "$category.categoryName",
            subCategories: {
              $push: {
                subCategoryName: "$subCategoryName",
                categoryName: "$category.categoryName",
              },
            },
            total: {
              $sum: 1,
            },
          },
        },
      ]);
      return res.status(200).json({
        message: "subCategory get successfully",
        data: data,
      });
    } catch (error) {
      logger.error(error);
    }
  }
}

module.exports = new LookupController();
