import mongoose from "mongoose";
import env from "dotenv";
env.config();

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
