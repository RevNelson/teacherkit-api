const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.findByName = async (req, res) => {
  const user = await User.findOne({
    name: {
      $regex: req.params.name
    }
  });
  return res.json(user);
};

// Get all users
exports.getAll = async (req, res) => {
  const users = await User.find(
    {},
    {
      _id: 1,
      name: 1,
      email: 1,
      about: 1,
      avatar: 1
    }
  );
  return res.json(users);
};
