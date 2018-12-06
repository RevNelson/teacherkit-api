const router = require("express").Router();
const User = require("mongoose").model("User");

router.use("/auth", require("./auth"));

router.use("/profile", require("./profile"));

router.use("/schools", require("./schools"));

router.use("/teachers", require("./teachers"));

router.use("/users", require("./users"));

router.use("/departments", require("./departments"));

router.use("/grades", require("./grades"));

module.exports = router;
