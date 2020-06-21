var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
var cors = require("cors");

var createError = require("http-errors");

var indexRouter = require("./routes/index");

var salesRouter = require("./routes/sales");

var ordersRouter = require("./routes/orders");

var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");

mongoose
  .connect("mongodb://localhost/goodsdelivery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

var app = express();

app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    credentials: true,
  })
);

// passport
var passport = require("passport");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    name: "myname.sid",
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
      maxAge: 36000000,
      httpOnly: false,
      secure: false,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
require("./passport-config");
app.use(passport.initialize());
app.use(passport.session());
// end of passport area

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/api", salesRouter);

app.use("/orders", ordersRouter);

app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
