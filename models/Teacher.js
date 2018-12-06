const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: "User ID is required"
    },
    schools: [
      {
        type: ObjectId,
        ref: "School"
      }
    ],
    departments: [
      {
        type: ObjectId,
        ref: "Department"
      }
    ],
    grades: [
      {
        type: ObjectId,
        ref: "Grade"
      }
    ],
    classes: [
      {
        type: ObjectId,
        ref: "Class"
      }
    ],
    students: [
      {
        type: ObjectId,
        ref: "Student"
      }
    ],
    periods: [
      {
        type: ObjectId,
        ref: "Period"
      }
    ],
    assignments: [
      {
        type: ObjectId,
        ref: "Assignment"
      }
    ],
    files: [
      {
        type: ObjectId,
        ref: "File"
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
teacherSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Teacher", teacherSchema);
