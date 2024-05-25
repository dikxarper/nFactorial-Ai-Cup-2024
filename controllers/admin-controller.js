const UserModel = require('../models/user-model')
const ProductModel = require('../models/product-model')
const CompanyModel = require('../models/company-model')
const CategoryModel = require('../models/category-model')

class AdminController {
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await ProductModel.find()
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getAllCompanies(req, res) {
        try {
            const companies = await CompanyModel.find()
            res.status(200).json(companies)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getAllCategories(req, res) {
        try {
            const categories = await CategoryModel.find()
            res.status(200).json(categories)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async createCategory(req, res) {
        try {
            const name = req.body.categoryName

            const newCategory = new CategoryModel({name})
            await newCategory.save()

            res.status(200).json({ message: "Category created successfully!" })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async updateCategory(req, res) {
        try {
            const categoryId = req.params.id
            const newCategoryName = req.body.categoryName

            const category = await CategoryModel.findByIdAndUpdate(categoryId, { name: newCategoryName }, { new: true })

            const oldCategoryName = category.name
            await ProductModel.updateMany({ category: oldCategoryName }, { category: newCategoryName })

            res.status(200).json({ message: "Category updated!" })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id

            const category = await CategoryModel.findById(categoryId)

            if (!category) {
                return res.status(404).json({ message: "Category not found" })
            }
            const categoryName = category.categoryName

            await ProductModel.deleteMany({ category: categoryName })

            await CategoryModel.findByIdAndDelete(categoryId)

            res.status(200).json({ message: "Category and associated products deleted successfully!" })
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getProductsByCategory(req, res) {
        try {
            const categoryId = req.params.id
            const category = await CategoryModel.findById(categoryId)
            const categoryName = category.name
            const products = await ProductModel.find({ category: categoryName })

            res.status(200).json(products)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    async getProductsByCompany(req, res) {
        try {
            const companyId = req.params.id
            const products = await ProductModel.findById(companyId)

            res.status(200).json(products)

        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = new AdminController()