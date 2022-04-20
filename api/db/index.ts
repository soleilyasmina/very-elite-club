import mongoose from "mongoose";

const MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://db:27017/veryeliteclub_development';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Successful connection to MongoDB!'))
  .catch((e) => console.error(`MongoDB error: ${e.message}!`));

export default mongoose.connection;
