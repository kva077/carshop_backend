const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    _id: String,
    email: { type: String, required: true, unique: true },
    image: String,
    license: { type: Boolean },
    name: String,
    sex: { type: String, enum: ["male", "female", "other"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
