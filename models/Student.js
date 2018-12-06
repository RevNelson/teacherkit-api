const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const studentSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        lowercase: true
      },
      py: {
        type: String,
        min: 3,
        max: 20,
        trim: true,
        lowercase: true
      },
      zh: {
        type: String,
        min: 2,
        max: 5,
        trim: true
      }
    },
    id: {
      type: String,
      min: 1,
      max: 15,
      trim: true
    },
    birthday: Date,
    contact: {
      email: {
        type: String,
        trim: true,
        lowercase: true
      },
      phone: {
        type: String,
        trim: true,
        lowercase: true
      }
    },
    schools: [
      {
        type: ObjectId,
        ref: "School"
      }
    ],
    about: {
      type: String,
      trim: true
    },
    custom: {}
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
studentSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("Student", studentSchema);
