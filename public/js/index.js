//Button Collapse Filter Handler & Input Jquery
// =============================
$("#day-filter").on("click", function (event) {
  event.preventDefault();
  $("#month-filter-form").attr("class", "collapse");
  $("#year-filter-form").attr("class", "collapse")
});

$("#month-filter").on("click", function (event) {
  event.preventDefault();
  $("#day-filter-form").attr("class", "collapse");
  $("#year-filter-form").attr("class", "collapse")
});

$("#year-filter").on("click", function (event) {
  event.preventDefault();
  $("#day-filter-form").attr("class", "collapse");
  $("#month-filter-form").attr("class", "collapse")
});

// Year pre-filled Dates
$("#year-date-start").attr("value", "1950");
$("#year-date-end").attr("value", moment().format("YYYY"));
$("#year-date-end").attr("max", moment().format("YYYY"));

// Day pre-filled Dates
$("#month-date-end").attr("value", moment().format("YYYY-MM"));
$("#month-date-end").attr("max", moment().format("YYYY-MM"));

// Day pre-filled Dates
$("#day-date-end").attr("value", moment().format("YYYY-MM-DD"));
$("#day-date-end").attr("max", moment().format("YYYY-MM-DD"));

// Event Handlers
//==============================
// ADD TRANSFER HANDLER
$("#submit-button").on("click", function (event) {
  event.preventDefault();
  // Construct the object to be sent to the server using the form data.
  var data = {
    type: $("select.type")
      .children("option:selected")
      .val(),
    category: $("select.category")
      .children("option:selected")
      .val(),
    date: $("#date-input").val(),
    amount: $("#amount-input").val(),
    memo: $("#memo-input").val()
  };

  console.log(data);
  // Posts constructed data object to the server THEN reloads page.
  $.post("/api/transaction", data).then(function () {
    location.reload();
  });
});

//Update A Transaction
$(document).on("click", "button.update", function (event) {
  event.preventDefault();
  //grab id from transaction and set to var
  var id = $(this).data("id");
  //set all the data to a variable ready to swap out
  var updatedData = {
    type: $("select.typeUp" + id)
      .children("option:selected").val(),
    category: $("select.categoryUp" + id)
      .children("option:selected").val(),
    date: $(".date-input" + id).val(),
    amount: $(".amount-input" + id).val(),
    memo: $(".memo-input" + id).val()
  };
  //tells me what im pulling
  console.log("id: " + id);
  console.log("Data Type: " + updatedData.type);
  console.log("Data Category: " + updatedData.category);
  console.log("Data Date: " + updatedData.date);
  console.log("Data Amount: " + updatedData.amount);
  console.log("Data Memo: " + updatedData.memo);
  //ajax call to api route
  $.ajax("/api/transaction/" + id, {
    method: "PUT",
    data: updatedData
  }).then(function () {
    location.reload();
  });
});
//Delete A Transaction
$(document).on("click", "button.delete", function (event) {
  event.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: "/api/transaction/" + id
  }).then(function () {
    location.reload();
  });
});
// ADD FILTER HANDLER
var filter = "";
$(".apply-filter-button").on("click", function (event) {
  event.preventDefault();
  if ($(this).attr("data-timeMetric") === "d") {
    var startDay = $("#day-date-start").val().replace(/-/g, "");
    var endDay = $("#day-date-end").val().replace(/-/g, "");
    filter = "yearmonthday/" + startDay + "/" + endDay;
  } else if ($(this).attr("data-timeMetric") === "m") {
    var startMonth = $("#month-date-start").val().replace(/-/g, "");
    var endMonth = $("#month-date-end").val().replace(/-/g, "");
    filter = "yearmonth/" + startMonth + "/" + endMonth;
  } else if ($(this).attr("data-timeMetric") === "y") {
    var startYear = $("#year-date-start").val();
    var endYear = $("#year-date-end").val();
    alert(startYear + "  " + endYear);
    filter = "year/" + startYear + "/" + endYear;
  }
});

// show user name next to logout
$('#log-user').text(sessionStorage.getItem('User'));
$('#log-user').css("color", "white");

// Charts
// ============================================================

// Get Data from Database to use in all charts. Uses filter variable above.
$.get("/api/transaction/" + filter).then(function (result) {
  var entertainmentCount = 0;
  var billsCount = 0;
  var personalCareCount = 0;
  var miscCount = 0;
  var withdrawCount = 0;
  var depositCount = 0;
  for (i = 0; i < result.length; i++) {
    if (result[i].category === "Entertainment") {
      entertainmentCount++;
    } else if (result[i].category === "Bills") {
      billsCount++;
    } else if (result[i].category === "Personal Care") {
      personalCareCount++;
    } else {
      miscCount++;
    }
    if (result[i].type === "Withdraw") {
      withdrawCount++;
    } else {
      depositCount++;
    }
  }

  // ===================================================================

  // Spending By Category -- Doughnut Chart
  var ctx = $("#spendChartDoughnut");
  var spendChartDoughnut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: "Spending Per Category",
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Spending By Category --- Bar Chart Creation
  var ctx = $("#spendChartBar");
  var spendChartBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: 'Spending Per Category',
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Spending By Category --- Pie Chart
  var ctx = $("#spendChartPie");
  var spendChartPie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Bills", "Personal Care", "Entertainment", "Misc."],
      datasets: [{
        label: 'Spending Per Category',
        data: [billsCount, personalCareCount, entertainmentCount, miscCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // =====================================================================================

  // Withdraw vs Deposit -- Doughnut Chart
  var ctx = $("#typeChartDoughnut");
  var typeChartDoughnut = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: "Spending Per Category",
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Withdraw vs Deposit --- Bar Chart Creation
  var ctx = $("#typeChartBar");
  var typeChartBar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: 'Spending Per Category',
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  // Withdraw vs Deposit --- Pie Chart
  var ctx = $("#typeChartPie");
  var typeChartPie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Withdrawals", "Deposits"],
      datasets: [{
        label: 'Spending Per Category',
        data: [withdrawCount, depositCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    }
  });

  //TIME LINE CHART
  // ====================================================================
  // generate array of months
  var xaxis = [];
  for (i = 0; i < 30; i++) {
    var date = moment().subtract(1 * i, 'days').format('MMM Do')
    xaxis.unshift(date)
  }
  console.log(xaxis)

  //enterain
  var entertain = [];
  for (var j = 0; j < xaxis.length; j++) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].category == "Entertainment" && moment(result[i].date).format('MMM Do') == xaxis[j]) {
        entertain.push(result[i])
      }
    }
  }
  //fuck up check
  for (var i = 0; i < entertain.length; i++) {
    console.log("date: " + moment(entertain[i].date).format('MMM Do'));
    console.log("amount: " + entertain[i].amount);
  }
  // relate with fuck up x axis
  var entertainmentSum = [];
  for (var i = 0; i < xaxis.length; i++) {
    entertainmentSum[i] = "null";
    for (var j = 0; j < entertain.length; j++) {
      if (moment(entertain[j].date).format('MMM Do') == xaxis[i]) {
        entertainmentSum[i] = entertain[j].amount
      }
    }
  }
  //fuck up check
  console.log("Y: " + entertainmentSum);
  //====
  // //Bills
  var bill = [];
  for (var j = 0; j < xaxis.length; j++) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].category == "Bills" && moment(result[i].date).format('MMM Do') == xaxis[j]) {
        bill.push(result[i])
      }
    }
  }
  for (var i = 0; i < bill.length; i++) {
    console.log("date: " + moment(bill[i].date).format('MMM Do'));
    console.log("amount: " + bill[i].amount);
  }
  var billSum = [];
  for (var i = 0; i < xaxis.length; i++) {
    billSum[i] = "null";
    for (var j = 0; j < bill.length; j++) {
      if (moment(bill[j].date).format('MMM Do') == xaxis[i]) {
        billSum[i] = bill[j].amount
      }
    }
  }
  console.log("Y: " + billSum);
  //====
  // Personalcare
  var pcare = [];
  for (var j = 0; j < xaxis.length; j++) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].category == "Personal Care" && moment(result[i].date).format('MMM Do') == xaxis[j]) {
        pcare.push(result[i])
      }
    }
  }
  for (var i = 0; i < pcare.length; i++) {
    console.log("date: " + moment(pcare[i].date).format('MMM Do'));
    console.log("amount: " + pcare[i].amount);
  }
  var pcareSum = [];
  for (var i = 0; i < xaxis.length; i++) {
    pcareSum[i] = "null";
    for (var j = 0; j < pcare.length; j++) {
      if (moment(pcare[j].date).format('MMM Do') == xaxis[i]) {
        pcareSum[i] = pcare[j].amount
      }
    }
  }
  console.log("Y: " + pcareSum);
  //====
  // plot this shit
  var ctx = $("#mainTimeChart");
  var spendChartLine = new Chart(ctx, {

    type: 'line',
    data: {
      labels: xaxis,
      datasets: [{
        label: 'Entertainment',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        fill: false,
        data: entertainmentSum
      }, {
        label: 'Bills',
        backgroundColor: 'blue',
        borderColor: 'blue',
        fill: false,
        data: billSum
      }, {
        label: 'Personal Care',
        backgroundColor: 'green',
        borderColor: 'green',
        fill: false,
        data: pcareSum
      }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Past 30 days history by category'
      },
      scales: {
        xAxes: [{
          display: true,
        }],
        yAxes: [{
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 20
          },
          showLines: true
        }]
      }
    }
  })
  // ====================================================================
});