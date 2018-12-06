const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const classSchema = new mongoose.Schema(
  {
    name: {
      // i.e. A, B, 1, or 2
      type: String,
      min: 1,
      max: 5,
      trim: true,
      required: "Name is required"
    },
    groups: [
      {
        type: ObjectId,
        ref: "Group"
      }
    ],
    subjects: [
      {
        type: ObjectId,
        ref: "Subject"
      }
    ],
    periods: [
      {
        type: ObjectId,
        ref: "Period"
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
classSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Class", classSchema);
