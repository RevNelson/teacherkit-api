const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required"
    },
    name: {
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
    phone: {
      type: String,
      trim: true,
      lowercase: true
    },
    avatar: {
      type: String,
      default: "/static/images/profile-image.jpg"
    },
    about: {
      type: String,
      trim: true
    },
    roles: [
      {
        type: ObjectId
      }
    ]
  },
  /* gives "createdAt" and "updatedAt" fields automatically */
  {
    timestamps: true
  }
);

/* passportLocalMongoose takes our User schema and sets up a passport "local" authentication strategy using our email as the username field */
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);
