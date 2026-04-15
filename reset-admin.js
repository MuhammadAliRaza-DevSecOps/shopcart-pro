const mongoose = require("mongoose");
require("dotenv").config();

const HASH = "$2b$10$/u8kc9tglfpLGHMyYevh9OiZrAR8rcf8H6KTUhU3VcNuDpOv2Cdam";
const EMAIL = "ali3@gmail.com";

async function main() {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log("❌ MONGO_URI nahi mila .env me");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);

    const User = mongoose.model(
      "User",
      new mongoose.Schema({}, { strict: false }),
      "users"
    );

    const result = await User.updateOne(
      { email: EMAIL },
      { $set: { password: HASH } }
    );

    console.log("✅ Password updated:", result);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();