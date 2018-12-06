const router = require("express").Router();
const validate = require("../controllers/validators");
const grade = require("../controllers/gradeController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get("/find", catchErrors(grade.find));

router.post(
  "/new",
  validate.auth,
  validate.checkName,
  catchErrors(grade.addNew)
);

router.put("/update", validate.auth, catchErrors(grade.update));

router.get("/", catchErrors(grade.getAll));

module.exports = router;
