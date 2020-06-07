const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys');
mongoose.set('useCreateIndex', true);
mongoose.promise = global.Promise;

module.exports = {
  setupDB() {
    // Connect to Mongoose
    beforeAll(async () => {
      jest.setTimeout(30000);
      const url = mongoURI;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
    // Disconnect Mongoose
    afterAll(async () => {
      await mongoose.connection.close();
    });
  },
};
