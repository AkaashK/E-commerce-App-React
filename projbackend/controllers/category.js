const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save category",
      });
    }
    res.json({
      category,
    });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find((error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "No categories found",
      });
    }
    res.json(categories);
  });
};

//update category
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to update category"+ error,
      });
    }
    res.json(updatedCategory);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete category",
      });
    }

    res.json({
      message: `${category}, This category is deleted`,
    });
  });
};
