var express = require("express");
var router = express.Router();
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var Order = require("../models/order");

server.listen(4001);

// socket io
io.on("connection", function (socket) {
  socket.on("updatedata", function (data) {
    io.emit("update-data", { data: data });
  });
});

// list data
router.get("/", function (req, res, next) {
  Order.find(function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

// list data by deliver
router.get("/getjobslist/:deliver", function (req, res, next) {
  Order.find({ deliver: req.params.deliver }, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

// item sales report
router.get("/orderslist", function (req, res, next) {
  Order.aggregate(
    [
      {
        $group: {
          _id: { itemId: "$itemId", itemName: "$itemName" },
        },
      },
    ],
    function (err, order) {
      if (err) return next(err);
      res.json(order);
    }
  );
});

// get data by id
router.get("/:id", function (req, res, next) {
  Order.findById(req.params.id, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

// post data
router.post("/", function (req, res, next) {
  Order.create(req.body, function (err, order) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(order);
  });
});

// put data
router.put("/:id", function (req, res, next) {
  Order.findByIdAndUpdate(req.params.id, req.body, function (err, order) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(order);
  });
});

// delete data by id
router.delete("/:id", function (req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, order) {
    if (err) return next(err);
    res.json(order);
  });
});

module.exports = router;
