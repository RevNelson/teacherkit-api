const db = require("mongoose");
const Grade = db.model("Grade");

exports.getAll = async (req, res) => {
  const grades = await Grade.find(
    {},
    {
      _id: 1,
      name: 1
    }
  );
  return res.json(grades);
};

exports.addNew = async (req, res) => {
  const grade = await new Grade(req.body).save();
  res.json(grade);
};

exports.update = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  console.log(req.body);
  const updatedGrade = await Grade.findOneAndUpdate(
    {
      _id: req.body._id
    },
    {
      $set: req.body
    },
    {
      new: true,
      runValidators: true
    }
  );
  return res.json(updatedGrade);
};

exports.find = async (req, res) => {
  const grade = await Grade.findOne(req.body, {
    _id: 1,
    name: 1,
    about: 1
  });
  return res.json(grade);
};
