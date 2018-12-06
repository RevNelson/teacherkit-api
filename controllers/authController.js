const mongoose = require("mongoose");
const User = mongoose.model("User");
const Teacher = mongoose.model("Teacher");
const passport = require("passport");

exports.signup = (req, res) => {
  const { name, email, password, roles } = req.body;
  if (!roles.some(v => ["Teacher", "Student", "Parent"].includes(v))) {
    return res.json("Roles must be set to Teacher, Student and/or Parent");
  }

  User.register(new User({ name, email }), password, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }

    if (roles.includes("Teacher")) {
      const roles = new Teacher({
        user: user._id
      });
      Teacher.populate(roles, {
        path: "user",
        select: "_id name avatar"
      });

      roles.save(function(err) {
        if (err) {
          return res.status(500).send(err.message);
        }

        user = User.findOneAndUpdate(
          {
            _id: user._id
          },
          {
            $push: {
              roles: roles._id
            }
          }
        );
      });
      passport.authenticate("local")(req, res, function() {
        return res.json(user);
      });
    }
  });
};

exports.signin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }

      return res.json(user);
    });
  })(req, res, next);
};

exports.signout = (req, res) => {
  res.clearCookie("teacherkit.sid");
  req.logout();
  res.json({
    message: "You are now signed out."
  });
};
