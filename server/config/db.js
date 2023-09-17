import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database connection established...");
  } catch (error) {
    console.log("database connection error" + error.message);
    process.exit(1);
  }
};

export default connection;
