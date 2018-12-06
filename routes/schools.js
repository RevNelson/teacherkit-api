const router = require("express").Router();
const validate = require("../controllers/validators");
const school = require("../controllers/schoolController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get("/:name", catchErrors(school.find));

router.post(
  "/new",
  validate.auth,
  validate.checkName,
  catchErrors(school.addNew)
);

router.put("/update", validate.auth, catchErrors(school.update));

router.get("/", catchErrors(school.getAll));

module.exports = router;
