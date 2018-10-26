var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Transaction.findAll({}).then(function (dbTransactionAll) {
    res.render("index", {trans:dbTransactionAll});
  });
  });

  // add page
  app.get("/add", function (req, res) {
    db.Transaction.findAll({}).then(function (dbTransactionAll) {
    res.render("add", {trans:dbTransactionAll});
  });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
