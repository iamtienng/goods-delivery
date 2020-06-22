var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.post("/register", function (req, res, next) {
  addToDB(req, res);
});

async function addToDB(req, res) {
  var user = new User({
    name: req.body.name,
    surname: req.body.surname,
    codiceFiscale: req.body.codiceFiscale,
    username: req.body.username,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
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
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(501).json(err);
    }
    if (!user) {
      return res.status(501).json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json({ message: "Login Success" });
    });
  })(req, res, next);
});

router.get("/user", isValidUser, function (req, res, next) {
  return res.status(200).json(req.user);
});

router.get("/logout", isValidUser, function (req, res, next) {
  req.logout();
  return res.status(200).json({ message: "Logout Success" });
});

function isValidUser(req, res, next) {
  if (req.isAuthenticated()) next();
  else return res.status(401).json({ message: "Unauthorized Request" });
}

// for admin side to show the list
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(4002);

// socket io
io.on("connection", function (socket) {
  socket.on("updatedata", function (data) {
    io.emit("update-data", { data: data });
  });
});

// list delivers
router.get("/delivers", function (req, res, next) {
  User.find(function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

// get deliver by id
router.get("/delivers/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

// delete deliver by id
router.delete("/delivers/:id", function (req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

module.exports = router;
