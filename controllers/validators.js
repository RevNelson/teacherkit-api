exports.auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("login");
};

exports.signup = (req, res, next) => {
  req.sanitizeBody("name");
  req.sanitizeBody("email");
  req.sanitizeBody("password");
  req.sanitizeBody("roles");

  // Name is non-null and is the appropriate length
  const minName = 2;
  const maxName = 40;
  req.checkBody("name", "Enter a name").notEmpty();
  req
    .checkBody(
      "name",
      `Name must be between ${minName} and ${maxName} characters.`
    )
    .isLength({
      min: minName,
      max: maxName
    });

  // Email is non-null, valid, and normalized
  req
    .checkBody("email", "Enter a valid email")
    .isEmail()
    .normalizeEmail();

  // Password is non-null and is the appropriate length
  const minPass = 6;
  req.checkBody("password", "Enter a password").notEmpty();
  req
    .checkBody("password", `Password must be at least ${minPass} characters.`)
    .isLength({
      min: minPass
    });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).send(firstError);
  }
  next();
};

exports.checkName = (req, res, next) => {
  const names = req.body.name;
  if (names) {
    return next();
  }
  return res.json("You must enter a name.");
};
