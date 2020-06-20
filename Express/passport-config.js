var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");
var Admin = require("./models/admin");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.isValid(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  "localAdmin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (username, password, done) {
      Admin.findOne({ email: username }, function (err, admin) {
        if (err) {
          return done(err);
        }
        if (!admin) {
          return done(null, false, { message: "Incorrect email." });
        }
        if (!admin.isValid(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, admin);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Admin.findById(id, function (err, user) {
    if (err) done(err);
    if (user) {
      done(null, user);
    } else {
      User.findById(id, function (err, user) {
        if (err) done(err);
        done(null, user);
      });
    }
  });
});
