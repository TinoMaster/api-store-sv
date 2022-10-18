const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config.json');

const digitalSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discount: Number,
  editions: Array,
  image: String,
  information: {
    Platform: String,
    year: Date,
    Publisher: String,
    Genre: String,
    online: Boolean,
    pirate: Boolean,
  },
});

const digitalModel = mongoose.model('digitals', digitalSchema);

mongoose.connect(`mongodb://${dbConfig.mongo.host}/${dbConfig.mongo.db}`);

module.exports = digitalModel;
