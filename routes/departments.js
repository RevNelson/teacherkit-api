const router = require("express").Router();
const validate = require("../controllers/validators");
const department = require("../controllers/departmentController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get("/find", catchErrors(department.find));

router.post(
  "/new",
  validate.auth,
  validate.checkName,
  catchErrors(department.addNew)
);

router.put("/update", validate.auth, catchErrors(department.update));

router.get("/", catchErrors(department.getAll));

module.exports = router;
