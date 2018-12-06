const router = require("express").Router();
const validate = require("../controllers/validators");
const profile = require("../controllers/profileController");

/* Error handler for async / await functions */
const catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

router.put(
  "/update",
  validate.auth,
  profile.uploadAvatar,
  catchErrors(profile.resizeAvatar),
  catchErrors(profile.update)
);

module.exports = router;
