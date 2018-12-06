const router = require("express").Router();
const validate = require("../controllers/validators");
const teacher = require("../controllers/teacherController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get("/find", catchErrors(teacher.find));

router.get("/:name", catchErrors(teacher.findByName));

router.get("/", catchErrors(teacher.getAll));

module.exports = router;
