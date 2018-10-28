var db = require("../models");

module.exports = function (app) {
  // Get all transaction
  app.get("/api/transaction", function (req, res) {
    db.Transaction.findAll({}).then(function (dbTransactionAll) {
      res.json(dbTransactionAll);
    });
  });

  //get all transactions by date
  app.get("/api/transaction/:date", function(req, res) {
    db.Transaction.findAll({
      where: {
        date: req.params.date
      }
    }).then(function(dbTransactionDate) {
      res.json(dbTransactionDate);
    });
  });

  //get all transactions by type
  app.get("/api/transaction/:type", function(req, res) {
    db.Transaction.findAll({
      where: {
        date: req.params.type
      }
    }).then(function(dbTransactionType) {
      res.json(dbTransactionType)
    });
  });

  //get all transactions by category
  app.get("/api/transaction/:category", function(req, res) {
    db.Transaction.findAll({
      where: {
        date: req.params.category
      }
    }).then(function(dbTransactionCat) {
      res.json(dbTransactionCat)
    });
  });

  // Create a new transaction
  app.post("/api/transaction", function(req, res) {
    console.log(req.body);
    db.Transaction.create(req.body).then(function(dbTransactionNew) {
      res.json(dbTransactionNew);
    });
  });

  // Delete an transaction by id
  app.delete("/api/transaction/:id", function (req, res) {
    db.Transaction.destroy({ where: { id: req.params.id } }).then(function (dbTransactionDel) {
      res.json(dbTransactionDel);
    });
  });


  //update a transaction by id
  app.put("/api/transaction/:id", function (req, res) {
    db.Transaction.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbTransactionUpdate) {
        res.json(dbTransactionUpdate)
      });
  });
};