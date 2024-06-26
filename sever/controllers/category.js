import Category from "../models/Category";
import { categoryValidate } from "../validations/category";

export const getCategory = async (req, res, next) => {
  try {
    const data = await Category.find();
    return res
      .status(200)
      .json({ message: "Category fetched successfully", data });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { error } = categoryValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const category = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { error } = categoryValidate.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    next(error);
  }
};
