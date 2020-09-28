/*******
* db.js file - config
********/ 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function connectMongoDB() {
  const db = process.env.MONGO_URI;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() =>
      console.log('\x1b[35m%s\x1b[0m', '[DATABASE] MONGO DB CONNECTED')
    )
    .catch((error) => console.log('\x1b[31m%s\x1b[0m', error));
};
