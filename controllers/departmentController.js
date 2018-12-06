const db = require("mongoose");
const Department = db.model("Department");

exports.getAll = async (req, res) => {
  const departments = await Department.find(
    {},
    {
      _id: 1,
      name: 1,
      grades: 1,
      teachers: 1
    }
  )
    .populate({
      path: "teachers",
      select: "user -_id",
      populate: {
        path: "user",
        select: "email name avatar -_id"
      }
    })
    .populate({
      path: "grades",
      select: "name -_id",
      populate: {
        path: "classes",
        select: "name -_id"
      },
      populate: {
        path: "subjects",
        select: "name -_id"
      }
    });
  return res.json(departments);
};

exports.addNew = async (req, res) => {
  const department = await new Department(req.body).save();
  res.json(department);
};

exports.update = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedDepartment = await Department.findOneAndUpdate(
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
  return res.json(updatedDepartment);
};

exports.find = async (req, res) => {
  const department = await Department.findOne(req.body, {
    _id: 1,
    name: 1,
    about: 1
  }).populate("teachers");
  return res.json(department);
};
