const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config');

const digitalSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discount: Number,
  edition: String,
  editions: Array,
  image: String,
  category: String,
  information: {
    Platform: String,
    year: Date,
    Publisher: String,
    Genre: String,
    online: Boolean,
    pirate: Boolean,
  },
});

const DigitalModel = mongoose.model('digitals', digitalSchema);

mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`);

module.exports = DigitalModel;
