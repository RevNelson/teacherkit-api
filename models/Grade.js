const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const gradeSchema = new mongoose.Schema(
  {
    name: {
      // i.e. 5 or 6 or K1
      type: String,
      min: 1,
      max: 3,
      trim: true,
      required: "Name is required"
    },
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher"
      }
    ],
    classes: [
      {
        type: ObjectId,
        ref: "Class"
      }
    ],
    subjects: [
      {
        type: ObjectId,
        ref: "Subject"
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
gradeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Grade", gradeSchema);
