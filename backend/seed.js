require("dotenv").config();
const mongoose = require("mongoose");

const Product = require("./src/models/Product");
const User = require("./src/models/User");

const products = require("./src/data/products");

// 👇 password hash ke liye
const bcrypt = require("bcryptjs");

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Mongo Connected");

    // =========================
    // ✅ ADMIN USER (SAFE)
    // =========================
    const existingAdmin = await User.findOne({ email: "aliadmin@gmail.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "Admin",
        email: "aliadmin@gmail.com",
        password: hashedPassword,
        isAdmin: true
      });

      console.log("✅ Admin created");
    } else {
      console.log("ℹ️ Admin already exists");
    }

    // =========================
    // ✅ PRODUCTS (RESET OK)
    // =========================
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ Products seeded");

    process.exit();
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seedData();