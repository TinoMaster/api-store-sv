const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config.json');

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  address: Object,
});

const userModel = mongoose.model('users', usersSchema);

mongoose.connect(`mongodb://${dbConfig.mongo.host}/${dbConfig.mongo.db}`);

module.exports = userModel;
