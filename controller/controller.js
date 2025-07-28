const asynchandler = require("express-async-handler");
const user = require("../models/user-model");
const { validationResult } = require("express-validator");
const apperorr = require("../utils/app-error");
const jsend = require("../utils/status-text");
const validator = require("validator");
const bcrypt = require("bcrypt");
const tokengenerator = require("../utils/token-generator");

const finduser = asynchandler(async (req, res, next) => {
  const id = req.params.id;

  const find = await user.findOne({ _id: id });

  res.json(find);
});

const regsteir = asynchandler(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const data = apperorr.create(jsend.fail, 404, error.array());
    return next(data);
  }

  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const validatorEmail = await validator.isEmail(email);

  if (!validatorEmail) {
    const data = apperorr.create(jsend.fail, 404, "email must by valid");
    return next(data);
  }

  const regsteir = new user({ name, email, password: hash, role });

  regsteir.token = await tokengenerator({
    email: regsteir.email,
    name: regsteir.name,
    _id: regsteir._id,
    role: regsteir.role,
  });

  await regsteir.save();

  res.redirect("/account/");
});

const login = asynchandler(async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const data = apperorr.create(jsend.fail, 404, error.array());
    return next(data);
  }

  if (req.cookies.token) {
    res.redirect("/account/home");
  }

  const { email, password } = req.body;

  const findUser = await user.findOne({ email });

  if (!findUser) {
    const data = apperorr.create(jsend.fail, 404, "user not found");
    return next(data);
  }

  const compare = await bcrypt.compare(password, findUser.password);

  if (!compare) {
    const data = apperorr.create(jsend.fail, 401, "password wrong");
    return next(data);
  }

  if (compare && findUser) {
    const jsonToken = await tokengenerator({
      email: findUser.email,
      role: findUser.role,
      _id: findUser._id,
    });

    res.cookie("token", jsonToken, { httpOnly: true });

    res.redirect("/account/home");
  }
});

module.exports = {
  regsteir,
  login,
  finduser,
};
