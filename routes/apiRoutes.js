
var db = require("../models");

module.exports = function (app) {

  // Get all transaction
  app.get("/api/transaction", function (req, res) {
    //if the user just registered the req.user.user_id wont be set
    //will be null in the table  
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for the id in the req.session.passport.user
      var userId = req.session.passport.user.id
    }

    db.Transaction.findAll({
      where: {
        UserId: userId
      }
      // }, include: [db.User]
    }
    ).then(function (dbTransactionAll) {
      res.json(dbTransactionAll);
    });
  });

  // Create a new transaction
  app.post("/api/transaction", function (req, res) {

    //if the user just registered the req.user.user_id wont be set
    //will be null in the table  
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for the id in the req.session.passport.user
      var userId = req.session.passport.user.id
    };

    let data = {
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      amount: req.body.amount,
      memo: req.body.memo,
      UserId: userId
    }
    console.log(data);

    db.Transaction.create(data).then(function (dbTransactionNew) {
      res.json(dbTransactionNew);
    });
  });

  // //get all transactions by date
  // app.get("/api/transaction/:date", function (req, res) {
  //   db.Transaction.findAll({
  //     where: {
  //       date: req.params.date
  //     },
  //     include: [db.User]
  //   }).then(function (dbTransactionDate) {
  //     res.json(dbTransactionDate);
  //   });
  // });

  // //get all transactions by type
  // app.get("/api/transaction/:type", function (req, res) {
  //   db.Transaction.findAll({
  //     where: {
  //       date: req.params.type

  //     },
  //     include: [db.User]
  //   }).then(function (dbTransactionType) {
  //     res.json(dbTransactionType)
  //   });
  // });

  // //get all transactions by category
  // app.get("/api/transaction/:category", function (req, res) {
  //   db.Transaction.findAll({
  //     where: {
  //       date: req.params.category

  //     }, include: [db.User]
  //   }).then(function (dbTransactionCat) {
  //     res.json(dbTransactionCat)
  //   });
  // });



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