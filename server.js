const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoos = require("./config/config");
const router = require("./routes/routs");
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./config/passport")(passport);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(passport.initialize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/account", router);
app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json({ status: err.statusText, message: err.message });
});

app.all("{*splat}", (req, res) => {
  res.status(404).json({ status: "fail", message: "API Not Found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server listen on port ${process.env.PORT}`);
});
