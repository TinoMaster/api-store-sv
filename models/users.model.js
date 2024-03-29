const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config');

const usersSchema = new Schema(
  {
    name: String,
    phone: Number,
    role: String,
    address: [
      {
        calle: String,
        entre: String,
        numero: String,
        apto: String,
        municipio: String,
        description: String,
      },
    ],
    active: Number,
    user: {
      email: {
        type: String,
        unique: true,
      },
      password: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model('users', usersSchema);

mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`);

module.exports = UserModel;
