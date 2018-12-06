const db = require("mongoose");
const School = db.model("School");

exports.getAll = async (req, res) => {
  const schools = await School.find(
    {},
    {
      _id: 1,
      name: 1,
      about: 1
    }
  );
  return res.json(schools);
};

exports.addNew = async (req, res) => {
  const school = await new School(req.body).save();
  res.json(school);
};

exports.update = async (req, res) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedSchool = await School.findOneAndUpdate(
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
  return res.json(updatedSchool);
};

exports.find = async (req, res) => {
  const school = await School.find(
    {
      $text: {
        $search: req.params.name
      }
    },
    {
      _id: 1,
      name: 1,
      about: 1
    }
  );
  return res.json(school);
};
