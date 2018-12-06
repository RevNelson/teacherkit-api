const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      // i.e. Middle School
      en: {
        type: String,
        min: 3,
        max: 20,
        trim: true
      },
      zh: {
        type: String,
        min: 2,
        max: 5,
        trim: true
      }
    },
    teachers: [
      {
        type: ObjectId,
        ref: "Teacher"
      }
    ],
    grades: [
      {
        type: ObjectId,
        ref: "Grade"
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
departmentSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Department", departmentSchema);
