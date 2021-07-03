const mongoose = require("mongoose");
const MONGOURI =
  "mongodb+srv://shreyas:GUoIoMLjNupQQKDO@cluster0.maghs.mongodb.net/debugathon?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
