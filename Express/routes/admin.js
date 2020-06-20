var express = require("express");
var router = express.Router();
var Admin = require("../models/admin");
var passport = require("passport");

router.post("/register", function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  var user = new Admin({
    email: req.body.email,
    username: req.body.username,
    password: Admin.hashPassword(req.body.password),
    creation_dt: Date.now(),
  });

  try {
    doc = await user.save();
    return res.status(201).json(doc);
  } catch (err) {
    return res.status(501).json(err);
  }
}

router.post("/login", function (req, res, next) {
  passport.authenticate("localAdmin", function (err, admin, info) {
    if (err) {
      return res.status(501).json(err);
    }
    if (!admin) {
      return res.status(501).json(info);
    }
    req.logIn(admin, function (err) {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json({ message: "Login Success" });
    });
  })(req, res, next);
});

router.get("/admin", isValidAdmin, function (req, res, next) {
  console.log(req.user);
  return res.status(200).json(req.user);
});

router.get("/logout", isValidAdmin, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: "Logout Success" });
});

function isValidAdmin(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: "Unauthorized Request" });
}

module.exports = router;
