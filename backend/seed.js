require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");
const products = require("./src/data/products");

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded");
    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seedProducts();