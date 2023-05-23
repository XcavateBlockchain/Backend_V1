const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
    //match:/pattern/
  },
  isDeleted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  phone: { type: String, required: true, minlength: 8, maxlength: 40 },
  address: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100,
  },
  bio: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 300,
    //match:/pattern/
  },
  imageUrl: {
    data: Buffer,
    contentType: String,
    //required: false,
  },
});

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);
