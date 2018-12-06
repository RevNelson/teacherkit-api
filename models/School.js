const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

// TODO - Add location

const schoolSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        min: 3,
        max: 50,
        trim: true,
        unique: true
      },
      zh: {
        type: String,
        min: 2,
        max: 10,
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
    ],
    departments: [
      {
        type: ObjectId,
        ref: "Department"
      }
    ],
    about: {
      type: String,
      trim: true
    }

    // Maybe add Principle and Administrator
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* The MongoDBErrorHandler plugin gives a better 'unique' error than: "11000 duplicate key" */
schoolSchema.plugin(mongodbErrorHandler);

schoolSchema.index({
  "name.en": "text",
  "name.zh": "text"
});

module.exports = mongoose.model("School", schoolSchema);
