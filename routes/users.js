const router = require("express").Router();
const validate = require("../controllers/validators");
const user = require("../controllers/userController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.get("/:name", catchErrors(user.findByName));

// Get all users
router.get("/", catchErrors(user.getAll));

module.exports = router;
