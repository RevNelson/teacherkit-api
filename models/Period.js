const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const periodSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      min: 6,
      max: 9,
      lowercase: true,
      trim: true,
      required: "Day is required"
    },
    start: {
      type: Date,
      required: "Start time is required"
    },
    duration: {
      type: Number,
      required: "Duration is required"
    },
    room: {
      type: String,
      min: 1,
      max: 5,
      trim: true
    }
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
periodSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Period", periodSchema);
