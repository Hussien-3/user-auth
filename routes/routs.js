const express = require("express");
const controller = require("../controller/controller");
const {
  validatorLogin,
  validatorRegsteir,
} = require("../middleware/validator-body");
const verfiy = require("../middleware/jwt-verfiy");
const allowto = require("../middleware/allow-to");
const role = require("../utils/rols-utilts");
const passport = require("passport");
const jsend = require("../utils/status-text");

const router = express.Router();

router.route("/findusers/:id").get(controller.finduser);

router
  .route("/sign-up")
  .post(validatorRegsteir(), controller.regsteir)
  .get((req, res) => {
    res.render("regsteir");
  });

router
  .route("/")
  .post(validatorLogin(), controller.login)
  .get((req, res) => {
    res.render("login");
  });

router.route("/home").get(verfiy, (req, res) => {
  res.render("home", { email: req.verfiy.email, role: req.verfiy.role });
});

module.exports = router;
