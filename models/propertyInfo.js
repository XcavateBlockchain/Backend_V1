const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    //match:/pattern/
  },
  isDeleted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  type: { type: String, required: true, minlength: 8, maxlength: 40 },
  address: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  feature: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 200,
    //match:/pattern/
  },
  imageUrl: {
    data: Buffer,
    contentType: String,
    //required: true,
  },
  imageUrlCap1: {
    data: Buffer,
    contentType: String,
    //required: true,
  },
  imageUrlCap2: {
    data: Buffer,
    contentType: String,
    //required: true,
  },
});

module.exports = mongoose.model("Property", propertySchema);
