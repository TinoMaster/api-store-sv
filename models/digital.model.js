const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConfig = require('./db.config');

const digitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
    },
    expirationDate: { type: Date, required: true },
    category: { type: String, required: true },
    seller: {
      type: Schema.ObjectId,
      ref: 'sellers',
    },
    image: String,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

const DigitalModel = mongoose.model('digitals', digitalSchema);

mongoose.connect(`${dbConfig.mongoHost}/${dbConfig.mongoDb}`);

module.exports = DigitalModel;
