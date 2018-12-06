const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const groupSchema = new mongoose.Schema(
  {
    name: {
      // i.e. A or B
      type: String,
      min: 1,
      max: 5,
      trim: true,
      required: "Name is required"
    },
    students: [
      {
        type: ObjectId,
        ref: "Student"
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
groupSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Group", groupSchema);
