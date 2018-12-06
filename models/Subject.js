const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      // i.e. Math, Science
      en: {
        type: String,
        min: 3,
        max: 40,
        trim: true
      },
      zh: {
        type: String,
        min: 2,
        max: 10,
        trim: true
      }
    },
    grade: {
      type: ObjectId,
      ref: "Group"
    }
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
subjectSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Subject", subjectSchema);
