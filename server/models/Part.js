const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    article: String,
    description: String,
    image: String,
    manufacturer: String,
    name: String,
    price: Number,
    stock: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Part", schema);
