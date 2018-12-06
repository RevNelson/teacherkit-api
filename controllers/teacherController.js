const db = require("mongoose");
const Teacher = db.model("Teacher");

exports.getAll = async (req, res) => {
  const teacher = await Teacher.find(
    {},
    {
      _id: 1,
      name: 1,
      about: 1
    }
  );
  res.json(teacher);
};

exports.find = async (req, res) => {
  console.log(req.body);
  const teacher = await Teacher.findOne(req.body);
  req.teacher = teacher;
  if (req.user && teacher.user._id.equals(req.user._id)) {
    req.isTeacher = true;
  }
  return res.json(teacher);
};

exports.findByName = async (req, res) => {
  console.log(req.params);
  const teacher = await Teacher.findOne({
    "user.name": {
      $in: [req.params.name]
    }
  });
  req.teacher = teacher;
  if (req.user && teacher.user._id.equals(req.user._id)) {
    req.isTeacher = true;
  }
  return res.json(teacher);
};
