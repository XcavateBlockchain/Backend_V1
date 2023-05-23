const mongoose = require("mongoose");

const lookUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    //match:/pattern/
  },
  isDeleted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  phone: { type: String, required: true, minlength: 8, maxlength: 20 },
});

module.exports = mongoose.model("Lookup", lookUpSchema);
