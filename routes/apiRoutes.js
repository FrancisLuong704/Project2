var Sequelize = require("sequelize");
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

  app.get("/api/transaction/timeline/:data/:category", function (req, res) {
    console.log(req.params.date);
    console.log(req.params.category);
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
        UserId: userId,
        date: req.params.date,
        category: req.params.category
      }
      // }, include: [db.User]
    }
    ).then(function (result) {
      console.log("\n\n\n" + result + "\n\n\n");
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
  ///====================
  //get all transactions by year
   app.get("/api/transaction/year/:from/:to", function (req, res) {
    var Op = Sequelize.Op;
    //if the user just registered the req.user.user_id wont be set
    //will be null in the table  
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for the id in the req.session.passport.user
      var userId = req.session.passport.user.id
    }
    var from = req.params.from;
    var to = req.params.to;
    db.Transaction.findAll({
      where: {
        date: { [Op.between]: [from + "-01-01", to + "-12-31"] },
        UserId: userId
      }
    }).then(function (dbTransactionDate) {
      res.json(dbTransactionDate);
    });
  });

  //get all transactions by range of date(year month)
    app.get("/api/transaction/yearmonth/:from/:to", function (req, res) {
      var Op = Sequelize.Op;
      //if the user just registered the req.user.user_id wont be set
      //will be null in the table  
      if (req.user.id) {
        var userId = req.user.id
      } else {
        //else look for the id in the req.session.passport.user
        var userId = req.session.passport.user.id
      }
      var from = req.params.from
      var to = req.params.to
      db.Transaction.findAll({
        where: {
          date: { [Op.between]: [from + "01", to + "31"] },
          UserId: userId
        }
      }).then(function (dbTransactionDate) {
        res.json(dbTransactionDate);
      });
    });

  //get all transactions by range of date (year month day)
  app.get("/api/transaction/yearmonthday/:from/:to", function (req, res) {
    var Op = Sequelize.Op;
    //if the user just registered the req.user.user_id wont be set
    //will be null in the table  
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for the id in the req.session.passport.user
      var userId = req.session.passport.user.id
    }
    var from = req.params.from
    var to = req.params.to
    db.Transaction.findAll({
      where: {
        date: { [Op.between]: [from, to] },
        UserId: userId
      }
    }).then(function (dbTransactionDate) {
      res.json(dbTransactionDate);
    });
  });
  //======================
  //get all transactions by type
  app.get("/api/transaction/:type", function (req, res) {
    //set req.body to a var
    var userTrans = req.body;
    //checks for user.id
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for id in the req.session.passport.user
      var userId = req.session.passport.user.id
    }

    db.Transaction.findAll({
      where: {
        UserId: userId,
        type: userTrans.type
      }
    }).then(function (dbTransactionType) {
      res.json(dbTransactionType)
    });
  });

  //get all transactions by category
  app.get("/api/transaction/:category", function (req, res) {
    //set req.body to a var
    var userTrans = req.body;
    //checks for user.id
    if (req.user.id) {
      var userId = req.user.id
    } else {
      //else look for id in the req.session.passport.user
      var userId = req.session.passport.user.id
    }

    db.Transaction.findAll({
      where: {
        UserId: userId,
        category: userTrans.category
      }
    }).then(function (dbTransactionCat) {
      res.json(dbTransactionCat)
    });
  });

 //update a transaction by id
 app.put("/api/transaction/:id", function (req, res, next) {
  if (req.user.id) {
    var userId = req.user.id
  } else {
    //else look for the id in the req.session.passport.user
    var userId = req.session.passport.user.id
  }
  //set the new info into a var
  var updatedTrans = {
    type: req.body.type,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    memo: req.body.memo,
  };
  //this is doing the transfer of info
  db.Transaction.update(
    {
      type: updatedTrans.type,
      category: updatedTrans.category,
      date: updatedTrans.date,
      amount: updatedTrans.amount,
      memo: updatedTrans.memo
    },
    {   //at this index/transaction id and UserID
      returning: true, 
      where: { 
        id: req.params.id,
        userId: userId
       }
    }).then(function (dbTransactionUpdate) {
      res.json(dbTransactionUpdate)
    });
});

 // Delete an transaction by id
 app.delete("/api/transaction/:id", function (req, res) {
  db.Transaction.destroy({ where: { id: req.params.id } }).then(function (dbTransactionDel) {
    res.json(dbTransactionDel);
  });
 }
)};