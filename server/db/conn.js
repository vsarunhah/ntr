const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


var _mongoClientDB;
var _mongooseDB;

module.exports = {
	connectionParams: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  mongooseConnect: function () {
    try {
      // console.log("connection params: ", this.connectionParams);
      mongoose.connect(process.env.ATLAS_URI, this.connectionParams);
      _mongooseDB = mongoose.connection;
      // console.log("mongoose connection: ", _mongooseDB);
      console.log("Connected to database successfully");
    } catch (error) {
      console.log(error);
      console.log("Could not connect database!");
    }
  },
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _mongoClientDB = db.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
    });
  },
 
  getDb: function () {
    return _mongoClientDB;
  },
};