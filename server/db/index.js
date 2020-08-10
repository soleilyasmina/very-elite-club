const mongoose = require('mongoose');

const MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/veryeliteclub_development';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(MONGODB_URI, options)
  .then(() => console.log('Successful connection to MongoDB!'))
  .catch((e) => console.error(`MongoDB error: ${e.message}!`));

module.exports = mongoose.connection;
