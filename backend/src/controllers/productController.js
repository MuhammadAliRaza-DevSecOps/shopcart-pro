const Product = require("../models/Product");

async function getProducts(req, res) {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, category, rating, stock, image, description } = req.body;

    if (!name || !price || !category || !image || !description) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      rating: rating || 4,
      stock: stock || 0,
      image,
      description
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
}





async function updateProduct(req, res) {
  try {
    const { name, price, category, rating, stock, image, description } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.rating = rating ?? product.rating;
    product.stock = stock ?? product.stock;
    product.image = image ?? product.image;
    product.description = description ?? product.description;

    const updatedProduct = await product.save();

    return res.json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
  
};