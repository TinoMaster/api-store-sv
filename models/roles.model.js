const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config');

const rolesSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const RolesModel = mongoose.model('roles', rolesSchema);

mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`);

module.exports = RolesModel;
