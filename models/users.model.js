const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config.json');

const usersSchema = new Schema({
  name: String,
  phone: String,
  role: String,
  address: Object,
  user: {
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
});

const userModel = mongoose.model('users', usersSchema);

mongoose.connect(`mongodb://${dbConfig.mongo.host}/${dbConfig.mongo.db}`);

module.exports = userModel;
