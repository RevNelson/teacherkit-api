const router = require("express").Router();
const validate = require("../controllers/validators");
const auth = require("../controllers/authController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.post("/register", validate.signup, auth.signup);
router.post("/signin", auth.signin);
router.get("/signout", auth.signout);

module.exports = router;
