const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

const WishModel = mongoose.model("wishes", DataSchema);

module.exports = WishModel;
