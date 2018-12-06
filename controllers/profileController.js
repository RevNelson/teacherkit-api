const mongoose = require("mongoose");
const User = mongoose.model("User");
const multer = require("multer");
const jimp = require("jimp");

const avatarUploadOptions = {
  storage: multer.memoryStorage(),
  limits: {
    // Store image files up to 3 megabytes
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith("image/")) {
      next(null, true);
    } else {
      next(null, false);
    }
  }
};

exports.uploadAvatar = multer(avatarUploadOptions).single("avatar");

exports.resizeAvatar = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const extension = req.file.mimetype.split("/")[1];
  req.body.avatar = `/static/uploads/avatars/${
    req.user.name
  }-${Date.now()}.${extension}`;
  const image = await jimp.read(req.file.buffer);
  await image.resize(250, jimp.AUTO);
  await image.write(`./${req.body.avatar}`);
  next();
};

exports.update = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    {
      $set: req.body
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.json(updatedUser);
};
